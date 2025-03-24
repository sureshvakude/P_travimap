from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import os

def validate_image_size(image):
    max_size = 100 * 1024  # 100 KB
    if image.size > max_size:
        raise ValidationError(_("Image size should not exceed 100 KB."))

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    followers = models.ManyToManyField('self', related_name='following', symmetrical=False, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    role = models.CharField(max_length=50, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='uploads/profile_pictures/', blank=True, null=True, validators=[validate_image_size])
    profile_background = models.ImageField(upload_to='uploads/profile_backgrounds/', blank=True, null=True, validators=[validate_image_size])
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Fix conflicts with Django auth model
    groups = models.ManyToManyField(Group, related_name="custom_user_set", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username
    
    def delete_old_file(self, field_name):
        """Deletes old file when updating a new one"""
        try:
            old_file = getattr(self, field_name)
            if old_file:
                if os.path.isfile(old_file.path):
                    os.remove(old_file.path)
        except Exception as e:
            print(f"Error deleting old file: {e}")

    def save(self, *args, **kwargs):
        # Check if updating profile_picture
        if self.pk:
            old_user = User.objects.get(pk=self.pk)
            if old_user.profile_picture != self.profile_picture:
                self.delete_old_file('profile_picture')
            if old_user.profile_background != self.profile_background:
                self.delete_old_file('profile_background')

        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete images from storage before deleting user
        self.delete_old_file('profile_picture')
        self.delete_old_file('profile_background')
        super().delete(*args, **kwargs)
