from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from .utils.jwt import decode_token

User = get_user_model()


class JWTAuthentication(BaseAuthentication):
    keyword = 'Bearer'

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != self.keyword:
            return None
        token = parts[1]
        try:
            payload = decode_token(token)
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid token')
        sub = payload.get('sub')
        if not sub:
            raise exceptions.AuthenticationFailed('Invalid token payload')
        try:
            user = User.objects.get(pk=sub)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('User not found')
        return (user, payload)
