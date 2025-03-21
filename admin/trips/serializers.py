from rest_framework import serializers
from .models import Trip, TripImage, Itinerary

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

class TripImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripImage
        fields = '__all__'

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = '__all__'