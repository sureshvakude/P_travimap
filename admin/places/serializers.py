from rest_framework import serializers
from .models import Place, PlaceImage

class PlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImage
        fields = '__all__'

class PlaceSerializer(serializers.ModelSerializer):
    images = PlaceImageSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = '__all__'
