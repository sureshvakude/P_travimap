from rest_framework import generics
from .models import Place
from .serializers import PlaceSerializer, PlaceDetailSerializer
from rest_framework.pagination import LimitOffsetPagination
from django.db.models import Q

class PlacePagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 100

class GetAllPlacesView(generics.ListAPIView):
    """
    Retrieve places filtered by OR conditions: name, category, or state.
    Example: /places/all/?name=beach&state=Texas&category=Park
    Returns any place that matches ANY of these.
    """
    serializer_class = PlaceSerializer
    pagination_class = PlacePagination

    def get_queryset(self):
        queryset = Place.objects.all().order_by('-id')

        # Get optional query parameters
        name = self.request.query_params.get('name')
        state = self.request.query_params.get('state')
        category = self.request.query_params.get('category')

        # Build Q object for OR filtering
        filters = Q()
        if name:
            filters |= Q(name__icontains=name)
        if state:
            filters |= Q(state__iexact=state)
        if category:
            filters |= Q(category__iexact=category)

        # Apply filters if any
        if filters:
            queryset = queryset.filter(filters)

        return queryset

class GetSinglePlaceView(generics.RetrieveAPIView):
    """Retrieve a single place by ID"""
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer
