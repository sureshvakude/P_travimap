from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Place, PlaceImage
from .serializers import PlaceSerializer, PlaceImageSerializer

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'category', 'region', 'state', 'nearby_city']
    ordering_fields = ['name', 'rating', 'likes']

    # Custom API endpoint for filtering by category
    @action(detail=False, methods=['get'])
    def category(self, request):
        category = request.query_params.get('category', None)
        if category:
            places = Place.objects.filter(category__iexact=category)
            serializer = self.get_serializer(places, many=True)
            return Response(serializer.data)
        return Response({"error": "Category parameter required"}, status=400)

    # Custom API endpoint for filtering by state
    @action(detail=False, methods=['get'])
    def state(self, request):
        state = request.query_params.get('state', None)
        if state:
            places = Place.objects.filter(state__iexact=state)
            serializer = self.get_serializer(places, many=True)
            return Response(serializer.data)
        return Response({"error": "State parameter required"}, status=400)

class PlaceImageViewSet(viewsets.ModelViewSet):
    queryset = PlaceImage.objects.all()
    serializer_class = PlaceImageSerializer
