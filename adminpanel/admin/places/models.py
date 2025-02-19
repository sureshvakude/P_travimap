from django.db import models

class Place(models.Model):
    class Meta:
        db_table = 'places'
    
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    nearby_city = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    best_time_to_visit = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    distance_from_nearby_place = models.FloatField()
    rating = models.FloatField(default=0.0)
    
    def __str__(self):
        return self.name

class PlaceImage(models.Model):
    place = models.ForeignKey(Place, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/place_images/')