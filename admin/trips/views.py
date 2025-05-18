from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Trip
from .serializers import TripSerializer, TripCreateSerializer, TripUpdateSerializer
from rest_framework.response import Response

class TripListView(generics.ListAPIView):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'destination', 'start_date', 'explore_places']

class TripCreateView(generics.CreateAPIView):
    serializer_class = TripCreateSerializer
    queryset = Trip.objects.all()

class TripDetailView(generics.RetrieveAPIView):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()

class TripUpdateView(generics.UpdateAPIView):
    serializer_class = TripUpdateSerializer
    queryset = Trip.objects.all()
    http_method_names = ['patch']  # Only allow PATCH method

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class TripDeleteView(generics.DestroyAPIView):
    serializer_class = TripSerializer
    queryset = Trip.objects.all()

class PublicTripListView(generics.ListAPIView):
    serializer_class = TripSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'destination', 'start_date', 'explore_places']

    def get_queryset(self):
        return Trip.objects.filter(trip_type='public')

class UserTripsView(generics.ListAPIView):
    serializer_class = TripSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Trip.objects.filter(user_id=user_id)

class JoinedTripsView(generics.ListAPIView):
    serializer_class = TripSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Trip.objects.filter(trip_members__id=user_id)
