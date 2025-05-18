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
            'id', 'user', 'name','description', 'destination', 'start_date', 'end_date',
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

class TripUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    trip_members = serializers.ListField(
        child=serializers.IntegerField(), 
        write_only=True, 
        required=False,
        help_text="Array of user IDs as integers"
    )

    class Meta:
        model = Trip
        fields = [
            'name', 'description', 'destination', 'start_date', 'end_date',
            'budget', 'explore_places', 'trip_type', 'trip_members', 'images'
        ]
        extra_kwargs = {
            'name': {'required': False},
            'destination': {'required': False},
            'start_date': {'required': False},
            'end_date': {'required': False},
        }

    def validate_trip_members(self, value):
        """Validate that all provided user IDs exist."""
        if value:
            existing_users = User.objects.filter(id__in=value).count()
            if existing_users != len(value):
                raise serializers.ValidationError("One or more user IDs are invalid")
        return value

    def update(self, instance, validated_data):
        images = validated_data.pop('images', None)
        trip_members = validated_data.pop('trip_members', None)

        # Update regular fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update trip members if provided
        if trip_members is not None:
            instance.trip_members.set(trip_members)

        # Add new images if provided
        if images:
            for img in images:
                TripImage.objects.create(trip=instance, image=img)

        return instance