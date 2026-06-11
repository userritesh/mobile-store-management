from django.core.management.base import BaseCommand
from rbac.models import Permission, Role, RolePermission

DEFAULT_PERMISSIONS = [
    ('product.view', 'View products', 'product'),
    ('product.create', 'Create products', 'product'),
    ('product.edit', 'Edit products', 'product'),
    ('product.delete', 'Delete products', 'product'),
    ('order.view', 'View orders', 'order'),
    ('order.approve', 'Approve orders', 'order'),
    ('dashboard.view', 'View dashboard', 'dashboard'),
    # Settings
    ('settings.general', 'General settings', 'settings'),
    ('settings.security', 'Security settings', 'settings'),
    ('settings.system', 'System configuration', 'settings'),
    # Audit
    ('audit.activity_logs', 'Activity logs', 'audit'),
    ('audit.login_history', 'Login history', 'audit'),
    ('audit.user_activity', 'User activity tracking', 'audit'),
    # Mobile management
    ('mobile.list', 'List mobiles', 'mobile'),
    ('mobile.add', 'Add mobile', 'mobile'),
    ('mobile.edit', 'Edit mobile', 'mobile'),
    ('mobile.view', 'View mobile details', 'mobile'),
]

DEFAULT_ROLES = {
    'Admin': ['product.view','product.create','product.edit','product.delete','order.view','order.approve','dashboard.view'],
    'Manager': ['product.view','order.view','order.approve','dashboard.view','mobile.list','mobile.view','mobile.edit','settings.general'],
    'Sales': ['product.view','order.view','mobile.list','mobile.view','mobile.add'],
    'Inventory': ['product.view','product.edit','dashboard.view','mobile.list','mobile.edit']
}


class Command(BaseCommand):
    help = 'Seed default permissions and roles'

    def handle(self, *args, **options):
        for key, name, group in DEFAULT_PERMISSIONS:
            Permission.objects.get_or_create(key=key, defaults={'name': name, 'group': group})
        self.stdout.write('Permissions seeded')

        for role_name, perms in DEFAULT_ROLES.items():
            role, _ = Role.objects.get_or_create(name=role_name)
            for pkey in perms:
                perm = Permission.objects.get(key=pkey)
                RolePermission.objects.get_or_create(role=role, permission=perm)
        self.stdout.write('Roles seeded')
