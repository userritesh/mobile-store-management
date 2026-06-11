from rest_framework.permissions import BasePermission
from django.core.cache import cache
from rbac.models import Permission, RolePermission, UserRole


def _get_permissions_from_db(user):
    cache_key = f'user_perms:{user.id}'
    perms = cache.get(cache_key)
    if perms is not None:
        return perms
    perms = set()
    for ur in UserRole.objects.filter(user=user).select_related('role'):
        role = ur.role
        for rp in role.role_permissions.select_related('permission').all():
            perms.add(rp.permission.key)
    perms_list = list(perms)
    cache.set(cache_key, perms_list, timeout=300)
    return perms_list


class HasPermission(BasePermission):
    """DRF permission class that checks `permission_required` attribute on view (dict or list).

    Usage: set `permission_required = {'create': ['product.create'], 'list': ['product.view']}` on a ViewSet
    or `permission_required = ['product.view']` on a view.
    """

    def has_permission(self, request, view):
        required = getattr(view, 'permission_required', None)
        if not required:
            return True
        # determine action name for viewsets
        action = getattr(view, 'action', None)
        keys = None
        if isinstance(required, dict) and action:
            keys = required.get(action) or required.get('default')
        elif isinstance(required, list):
            keys = required
        elif isinstance(required, dict):
            keys = required.get('default')

        if not keys:
            return True

        # check token payload first
        auth = request.auth
        token_perms = []
        if isinstance(auth, dict):
            token_perms = auth.get('perms', [])

        def has_any(keys_list):
            for k in keys_list:
                if k in token_perms:
                    return True
                # wildcard support
                for p in token_perms:
                    if p.endswith('.*'):
                        prefix = p[:-2]
                        if k.startswith(prefix + '.'):
                            return True
            return False

        if has_any(keys):
            return True

        # fallback to DB lookup
        perms = _get_permissions_from_db(request.user)
        for k in keys:
            if k in perms:
                return True
            for p in perms:
                if p.endswith('.*') and k.startswith(p[:-2] + '.'):
                    return True
        return False
