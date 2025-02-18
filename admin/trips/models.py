from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    class TripType(models.TextChoices):
        PRIVATE = 'Private', 'Private'
        PUBLIC = 'Public', 'Public'

    user = models.ForeignKey(User, related_name='trips', on_delete=models.CASCADE)  # Link to User model
    name = models.CharField(max_length=255)
    img = models.ImageField(upload_to='uploads/trip_images/')  # Single image for trip
    destination = models.CharField(max_length=255)
    startDate = models.DateField()
    endDate = models.DateField()
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    explorePlaces = models.JSONField(default=list)  # Array of places to explore
    itinerary = models.JSONField(default=list)  # Itinerary: list of days and activities
    type = models.CharField(max_length=7, choices=TripType.choices)
    tripMembers = models.ManyToManyField(User, related_name='trip_members')  # Multiple users
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'trips'

    def __str__(self):
        return self.name


class Itinerary(models.Model):
    trip = models.ForeignKey(Trip, related_name='itineraries', on_delete=models.CASCADE)  # Custom related_name here
    day = models.PositiveIntegerField()  # Day number
    activities = models.JSONField(default=list)  # List of activities for this day

    class Meta:
        db_table = 'trip_itinerary'  # New custom table name for the Itinerary model

    def __str__(self):
        return f"Day {self.day} activities for {self.trip.name}"
