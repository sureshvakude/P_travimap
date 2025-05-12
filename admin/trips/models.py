from django.db import models
import os
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from users.models import User  

# Function to validate image size (Max: 100KB)
def validate_image_size(image):
    max_size = 100 * 1024  # 100KB
    if image.size > max_size:
        raise ValidationError("Image file size must not exceed 100KB.")

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
    image = models.ImageField(upload_to="trips/", validators=[validate_image_size])

    def __str__(self):
        return f"Image for {self.trip.name}"

    def delete(self, *args, **kwargs):
        """Delete image file from storage when the instance is deleted."""
        if self.image and os.path.isfile(self.image.path):
            os.remove(self.image.path)  # Remove file from file system
        super().delete(*args, **kwargs)

# Signal to delete image files when a TripImage is deleted
@receiver(models.signals.post_delete, sender=TripImage)
def auto_delete_trip_image_on_delete(sender, instance, **kwargs):
    """Deletes image file from storage when corresponding TripImage object is deleted."""
    if instance.image and os.path.isfile(instance.image.path):
        os.remove(instance.image.path)

# Signal to delete all related images when a Trip is deleted
@receiver(models.signals.pre_delete, sender=Trip)
def delete_related_trip_images(sender, instance, **kwargs):
    """Deletes all related TripImage objects and their files when a Trip is deleted."""
    for image in instance.images.all():
        image.delete()  # This will call the overridden delete method and remove the image file

class Itinerary(models.Model):
    trip = models.ForeignKey(Trip, related_name="itinerary", on_delete=models.CASCADE)
    day = models.IntegerField()
    activities = models.TextField()  # List of activities as a text field

    class Meta:
        ordering = ['day']

    def __str__(self):
        return f"Day {self.day} for {self.trip.name}"
