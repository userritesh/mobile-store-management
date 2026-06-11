from django.contrib import admin
from django.contrib.auth import get_user_model
from rbac.models import UserRole, Role
from .models import Company, ClientRegistration
from django.utils.crypto import get_random_string

User = get_user_model()


class UserRoleInline(admin.TabularInline):
    model = UserRole
    extra = 0
    fk_name = 'user'


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_active', 'is_staff')
    search_fields = ('username', 'email')
    inlines = [UserRoleInline]
    list_per_page = 25
    actions = ('assign_admin_role', 'assign_client_role', 'remove_all_roles')

    def assign_role(self, request, queryset, role_name, make_staff=False):
        role, _ = Role.objects.get_or_create(name=role_name)
        created = 0
        for user in queryset:
            ur, created_flag = UserRole.objects.get_or_create(user=user, role=role)
            if created_flag:
                created += 1
            # ensure admin site access for admin role
            if make_staff and not user.is_staff:
                user.is_staff = True
                user.save()
        self.message_user(request, f"Assigned role '{role_name}' to {queryset.count()} users ({created} new assignments)")

    def assign_admin_role(self, request, queryset):
        """Assign the 'Admin' role and make users staff so they can access admin UI."""
        return self.assign_role(request, queryset, 'Admin', make_staff=True)
    assign_admin_role.short_description = 'Assign Admin role and grant admin access'

    def assign_client_role(self, request, queryset):
        """Assign the 'Client' role (non-staff by default)."""
        return self.assign_role(request, queryset, 'Client', make_staff=False)
    assign_client_role.short_description = 'Assign Client role'

    def remove_all_roles(self, request, queryset):
        removed = 0
        for user in queryset:
            removed += UserRole.objects.filter(user=user).delete()[0]
            if user.is_staff:
                user.is_staff = False
                user.save()
        self.message_user(request, f"Removed {removed} role assignments and revoked staff where applicable")
    remove_all_roles.short_description = 'Remove all roles from selected users and revoke staff'


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('user', 'role')
    search_fields = ('user__username', 'role__name')


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'company_email', 'status', 'created_at')
    search_fields = ('company_name', 'company_email')
    list_filter = ('status',)


@admin.register(ClientRegistration)
class ClientRegistrationAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'company_email', 'contact_person', 'status', 'created_at')
    actions = ('approve_registrations', 'reject_registrations')

    def approve_registrations(self, request, queryset):
        created_companies = 0
        created_users = 0
        for reg in queryset.filter(status=ClientRegistration.STATUS_PENDING):
            # create company
            company = Company.objects.create(
                company_name=reg.company_name,
                company_email=reg.company_email,
                phone=reg.phone,
                status=Company.STATUS_APPROVED,
            )
            created_companies += 1

            # create client admin user
            username_base = reg.company_email.split('@')[0]
            username = username_base
            # ensure unique username
            counter = 1
            from django.contrib.auth import get_user_model
            User = get_user_model()
            while User.objects.filter(username=username).exists():
                username = f"{username_base}{counter}"
                counter += 1

            password = get_random_string(12)
            user = User.objects.create(username=username, email=reg.company_email, company=company, is_active=True, is_staff=True)
            user.set_password(password)
            user.save()
            created_users += 1

            # create or get role and assign
            role, _ = Role.objects.get_or_create(name='Client Admin', company=company)
            UserRole.objects.create(user=user, role=role)

            # mark registration approved
            reg.approve()

            # notify admin (message) — include credentials in admin message
            self.message_user(request, f"Created company '{company.company_name}' and client admin '{user.username}' (password: {password})")

        self.message_user(request, f"Approved {created_companies} registrations and created {created_users} users")
    approve_registrations.short_description = 'Approve selected client registrations'

    def reject_registrations(self, request, queryset):
        for reg in queryset.filter(status=ClientRegistration.STATUS_PENDING):
            reg.reject()
        self.message_user(request, f"Rejected {queryset.filter(status=ClientRegistration.STATUS_REJECTED).count()} registrations")
    reject_registrations.short_description = 'Reject selected client registrations'
