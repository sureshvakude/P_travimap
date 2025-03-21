from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TripViewSet, TripImageViewSet, ItineraryViewSet, ExportTripCSV,
    GetAllTripsView, GetSingleTripView, UpdateTripView, DeleteTripView, GetTripsByTypeView
)

router = DefaultRouter()
router.register(r'trips', TripViewSet)
router.register(r'trip-images', TripImageViewSet)
router.register(r'itineraries', ItineraryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('export-trips/', ExportTripCSV.as_view(), name='export_trips'),
    path('trips/all/', GetAllTripsView.as_view(), name='get_all_trips'),
    path('trips/<int:pk>/', GetSingleTripView.as_view(), name='get_single_trip'),
    path('trips/update/<int:pk>/', UpdateTripView.as_view(), name='update_trip'),
    path('trips/delete/<int:pk>/', DeleteTripView.as_view(), name='delete_trip'),
    path('trips/type/<str:trip_type>/', GetTripsByTypeView.as_view(), name='get_trips_by_type'),
]