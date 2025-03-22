from rest_framework import generics
from .models import Place
from .serializers import PlaceSerializer, PlaceDetailSerializer

class GetAllPlacesView(generics.ListAPIView):
    """Retrieve all places"""
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer

class GetSinglePlaceView(generics.RetrieveAPIView):
    """Retrieve a single place by ID"""
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer

class GetPlacesByStateView(generics.ListAPIView):
    """Retrieve places filtered by state"""
    serializer_class = PlaceSerializer

    def get_queryset(self):
        state = self.kwargs['state']
        return Place.objects.filter(state=state)

class GetPlacesByCategoryView(generics.ListAPIView):
    """Retrieve places filtered by category"""
    serializer_class = PlaceSerializer

    def get_queryset(self):
        category = self.kwargs['category']
        return Place.objects.filter(category=category)
