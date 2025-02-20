from django.db import models
from users.models import User  
from places.models import Place  # Import Place model

class Trip(models.Model):
    TRIP_TYPES = [
        ('public', 'Public'),
        ('private', 'Private'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="trips")  # Trip creator
    name = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    explore_places = models.TextField(blank=True, null=True)
    trip_type = models.CharField(max_length=10, choices=TRIP_TYPES, default='public')
    trip_members = models.ManyToManyField(User, related_name="trip_members", blank=True)  # Users in the trip
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "trips"

    def __str__(self):
        return self.name

class TripImage(models.Model):
    trip = models.ForeignKey(Trip, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="uploads/trips/")

    def __str__(self):
        return f"Image for {self.trip.name}"

class Itinerary(models.Model):
    trip = models.ForeignKey(Trip, related_name="itinerary", on_delete=models.CASCADE)
    day = models.IntegerField()
    activities = models.TextField()  # List of activities as a text field

    class Meta:
        ordering = ['day']

    def __str__(self):
        return f"Day {self.day} for {self.trip.name}"
