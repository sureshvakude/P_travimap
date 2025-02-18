from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser):
    class Meta:
        db_table = 'users'
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User')
    )
    
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=11, unique=True)
    followers = models.ManyToManyField('self', symmetrical=False, related_name='user_followers', blank=True)
    follow = models.ManyToManyField('self', symmetrical=False, related_name='user_following', blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to='uploads/profile_pictures/', blank=True, null=True)
    profile_background = models.ImageField(upload_to='uploads/profile_backgrounds/', blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.username