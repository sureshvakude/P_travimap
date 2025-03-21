from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
import csv
from .models import Trip, TripImage, Itinerary
from .serializers import TripSerializer, TripImageSerializer, ItinerarySerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class GetAllTripsView(generics.ListAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class GetSingleTripView(generics.RetrieveAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class UpdateTripView(generics.UpdateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class DeleteTripView(generics.DestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class GetTripsByTypeView(generics.ListAPIView):
    serializer_class = TripSerializer

    def get_queryset(self):
        trip_type = self.kwargs['trip_type']
        return Trip.objects.filter(trip_type=trip_type)

class ExportTripCSV(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="trips.csv"'
        writer = csv.writer(response)
        writer.writerow(['ID', 'User', 'Name', 'Destination', 'Start Date', 'End Date', 'Budget', 'Trip Type'])
        for trip in Trip.objects.all():
            writer.writerow([trip.id, trip.user.username, trip.name, trip.destination, trip.start_date, trip.end_date, trip.budget, trip.trip_type])
        return response