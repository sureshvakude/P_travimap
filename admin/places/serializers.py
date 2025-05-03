from rest_framework import serializers
from .models import Place, PlaceImage

class PlaceImageSerializer(serializers.ModelSerializer):
    """Serializer for Place Images"""
    class Meta:
        model = PlaceImage
        fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):
    """Serializer for Place without images"""
    images = PlaceImageSerializer(many=True, read_only=True)
    class Meta:
        model = Place
        fields = '__all__'

class PlaceDetailSerializer(serializers.ModelSerializer):
    """Serializer for Place with images"""
    images = PlaceImageSerializer(many=True, read_only=True)  # Include images in response

    class Meta:
        model = Place
        fields = '__all__'
