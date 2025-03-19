from django.db import models
import os
from django.dispatch import receiver

class Place(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    nearby_city = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    best_time_to_visit = models.CharField(max_length=255)
    state = models.CharField(max_length=100)
    distance_from_nearby_place = models.DecimalField(max_digits=10, decimal_places=2)  # Distance in KM
    rating = models.FloatField(default=0.0)

    class Meta:
        db_table = "places"  # Set table name in the database

    def __str__(self):
        return self.name

class PlaceImage(models.Model):
    place = models.ForeignKey(Place, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="uploads/places/")

    def __str__(self):
        return f"Image for {self.place.name}"

    def delete(self, *args, **kwargs):
        """Delete image file from storage when the instance is deleted."""
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)  # Remove file from file system
        super().delete(*args, **kwargs)

# Signal to delete image files when a PlaceImage is deleted
@receiver(models.signals.post_delete, sender=PlaceImage)
def auto_delete_image_on_delete(sender, instance, **kwargs):
    """Deletes image file from storage when corresponding PlaceImage object is deleted."""
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)

# Signal to delete all related images when a Place is deleted
@receiver(models.signals.pre_delete, sender=Place)
def delete_related_images(sender, instance, **kwargs):
    """Deletes all related PlaceImage objects and their files when a Place is deleted."""
    for image in instance.images.all():
        image.delete()  # This will call the overridden delete method and remove the image file