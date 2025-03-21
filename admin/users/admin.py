from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from import_export.admin import ImportExportModelAdmin
from import_export import resources

class UserResource(resources.ModelResource):
    class Meta:
        model = User

class CustomUserAdmin(ImportExportModelAdmin,  admin.ModelAdmin):
    resource_class = UserResource
    model = User
    list_display = ('username', 'email', 'mobile_number', 'gender', 'dob', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('gender', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'mobile_number')

    def display_followers(self, obj):
        return ", ".join([user.username for user in obj.followers.all()])
    
    def display_following(self, obj):
        return ", ".join([user.username for user in obj.following.all()])

    display_followers.short_description = "Followers"
    display_following.short_description = "Following"

    readonly_fields = ('display_followers', 'display_following')  # Use display methods instead

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal Info', {'fields': ('mobile_number', 'address', 'gender', 'dob', 'role')}),
        ('Follow Details', {'fields': ('display_followers', 'display_following')}),  # Use the display methods here
        ('Profile', {'fields': ('profile_picture', 'profile_background')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),  
    )

admin.site.register(User, CustomUserAdmin)
