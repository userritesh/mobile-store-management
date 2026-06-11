from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
from .serializers import LoginSerializer
from .models import RefreshToken
from rbac.models import UserRole, RolePermission, Permission
from .utils.jwt import create_access_token
from datetime import timedelta
import secrets
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserModelSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .models import ClientRegistration
from rest_framework.response import Response


def _get_user_permissions(user):
    # Collect permissions from roles
    perms = set()
    for ur in UserRole.objects.filter(user=user).select_related('role'):
        r = ur.role
        for rp in r.role_permissions.select_related('permission').all():
            perms.add(rp.permission.key)
    return list(perms)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        perms = _get_user_permissions(user)
        access = create_access_token(user.id, perms)

        # create refresh token (opaque) and store hashed
        raw_refresh = secrets.token_urlsafe(64)
        hash_val = make_password(raw_refresh)
        expires_at = timezone.now() + timedelta(seconds=settings.REFRESH_TOKEN_LIFETIME)
        rt = RefreshToken.objects.create(user=user, token_hash=hash_val, expires_at=expires_at)

        resp = Response({
            'accessToken': access,
            'tokenType': 'Bearer',
            'expiresIn': settings.ACCESS_TOKEN_LIFETIME,
            'refreshTokenIssued': True,
            'user': {
                'id': str(user.id),
                'name': getattr(user, 'get_full_name', lambda: user.username)(),
                'email': user.email,
                'roles': [ur.role.name for ur in user.user_roles.all()],
                'permissions': perms,
            }
        })
        # set refresh cookie (HttpOnly, Secure recommended in production)
        resp.set_cookie('refresh_token', raw_refresh, httponly=True, secure=not settings.DEBUG, samesite='Lax', expires=expires_at)
        return resp


class RefreshView(APIView):
    def post(self, request):
        raw = request.COOKIES.get('refresh_token')
        if not raw:
            return Response({'detail': 'No refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        # find matching refresh token by checking hash
        rts = RefreshToken.objects.filter(revoked=False, expires_at__gt=timezone.now())
        found = None
        for rt in rts.select_related('user'):
            if check_password(raw, rt.token_hash):
                found = rt
                break
        if not found:
            return Response({'detail': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)

        user = found.user
        # rotate: revoke current and issue new
        found.revoked = True
        found.save()
        raw_refresh = secrets.token_urlsafe(64)
        from django.contrib.auth.hashers import make_password
        new_hash = make_password(raw_refresh)
        expires_at = timezone.now() + timedelta(seconds=settings.REFRESH_TOKEN_LIFETIME)
        RefreshToken.objects.create(user=user, token_hash=new_hash, expires_at=expires_at)

        perms = _get_user_permissions(user)
        access = create_access_token(user.id, perms)

        resp = Response({
            'accessToken': access,
            'tokenType': 'Bearer',
            'expiresIn': settings.ACCESS_TOKEN_LIFETIME,
            'refreshTokenIssued': True,
            'user': {
                'id': str(user.id),
                'name': getattr(user, 'get_full_name', lambda: user.username)(),
                'email': user.email,
                'roles': [ur.role.name for ur in user.user_roles.all()],
                'permissions': perms,
            }
        })
        resp.set_cookie('refresh_token', raw_refresh, httponly=True, secure=not settings.DEBUG, samesite='Lax', expires=expires_at)
        return resp


class LogoutView(APIView):
    def post(self, request):
        raw = request.COOKIES.get('refresh_token')
        if raw:
            # revoke matching tokens
            from django.contrib.auth.hashers import check_password
            for rt in RefreshToken.objects.filter(revoked=False):
                if check_password(raw, rt.token_hash):
                    rt.revoked = True
                    rt.save()
        resp = Response({'detail': 'logged out'})
        resp.delete_cookie('refresh_token')
        return resp


class MeView(APIView):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'detail': 'unauthenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        perms = _get_user_permissions(user)
        return Response({'user': {
            'id': str(user.id),
            'name': getattr(user, 'get_full_name', lambda: user.username)(),
            'email': user.email,
            'roles': [ur.role.name for ur in user.user_roles.all()],
            'permissions': perms,
        }})


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """User API. Admins (role named 'Admin') can list all users.
    Non-admin users can only view/edit their own user object.
    """
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_roles.filter(role__name='Admin').exists():
            return User.objects.all()
        return User.objects.filter(id=user.id)


class RegisterClientView(APIView):
    """Public endpoint to register a new client (status = Pending)."""
    def post(self, request):
        data = request.data
        required = ('company_name', 'company_email', 'contact_person', 'password')
        for f in required:
            if not data.get(f):
                return Response({'detail': f'Missing field: {f}'}, status=status.HTTP_400_BAD_REQUEST)

        reg = ClientRegistration.objects.create(
            company_name=data.get('company_name'),
            company_email=data.get('company_email'),
            contact_person=data.get('contact_person'),
            phone=data.get('phone', ''),
            password_hash=make_password(data.get('password')),
            status=ClientRegistration.STATUS_PENDING,
        )

        return Response({
            'detail': 'Registration received',
            'id': str(reg.id),
            'status': reg.status,
            'created_at': reg.created_at.isoformat(),
        }, status=status.HTTP_201_CREATED)
