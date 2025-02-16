from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    address = models.TextField(blank=True, null=True)
    mobile_number = models.CharField(max_length=10, unique=True)
    followers = models.JSONField(default=list)
    follow = models.JSONField(default=list)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    DOB = models.DateField(null=True, blank=True)
    role = models.CharField(max_length=10, default='user')
    is_active = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to='uploads/', default='uploads/default-avatar.png')
    profile_background = models.ImageField(upload_to='uploads/', default='uploads/default-avatar-bg.png')

    # Fix the error by adding related_name to avoid clashes
    groups = models.ManyToManyField(Group, related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)
    class Meta:
        db_table = "users"

# Place Model
class Place(models.Model):
    name = models.CharField(max_length=255)
    img = models.ImageField(upload_to='places/')
    description = models.TextField()
    like = models.IntegerField(default=0)
    nearby_city = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    best_time_to_visit = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    distance_from_nearby_place = models.CharField(max_length=255)
    rating = models.IntegerField()
    class Meta:
        db_table = "places"

# Post Model
class Post(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    img = models.ImageField(upload_to='posts/')
    caption = models.TextField()
    like = models.IntegerField(default=0)
    comments = models.JSONField(default=list)
    class Meta:
        db_table = "posts"

# Trip Model
class Trip(models.Model):
    name = models.CharField(max_length=255)
    img = models.ImageField(upload_to='trips/')
    destination = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.IntegerField()
    explore_places = models.JSONField(default=list)
    itinerary = models.JSONField(default=list)
    type = models.CharField(max_length=10, choices=[('private', 'Private'), ('public', 'Public')])
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    trip_members = models.ManyToManyField(User, related_name='trip_members')
    class Meta:
        db_table = "trips"