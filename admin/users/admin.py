from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'mobile_number', 'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'mobile_number')
    ordering = ('id',)
    
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('address', 'mobile_number', 'gender', 'dob', 'profile_picture', 'profile_background')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser')}),
        ('Relationships', {'fields': ('followers', 'follow')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'is_active', 'is_staff', 'is_superuser')
        }),
    )

    # Remove groups and user_permissions since they don't exist in the custom User model
    filter_horizontal = ()

admin.site.register(User, CustomUserAdmin)