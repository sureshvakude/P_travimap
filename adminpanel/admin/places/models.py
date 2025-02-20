from django.db import models

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
