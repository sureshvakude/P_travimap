from rest_framework import serializers
from .models import Trip, TripImage, Itinerary
from users.models import User

class TripImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripImage
        fields = ['id', 'image']

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'day', 'activities']

class TripSerializer(serializers.ModelSerializer):
    images = TripImageSerializer(many=True, read_only=True)
    itinerary = ItinerarySerializer(many=True, read_only=True)
    trip_members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'user', 'name', 'destination', 'start_date', 'end_date',
            'budget', 'explore_places', 'trip_type', 'trip_members',
            'created_at', 'images', 'itinerary'
        ]

class TripCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Trip
        fields = [
            'user', 'name', 'destination', 'start_date', 'end_date',
            'budget', 'explore_places', 'trip_type', 'trip_members', 'images'
        ]

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        trip_members = validated_data.pop('trip_members', [])
        trip = Trip.objects.create(**validated_data)
        
        if trip_members:
            trip.trip_members.set(trip_members)

        for img in images:
            TripImage.objects.create(trip=trip, image=img)

        return trip

