from django.urls import path
from .views import (
    TripListView, TripCreateView, TripDetailView, TripUpdateView, TripDeleteView,
    PublicTripListView, UserTripsView, JoinedTripsView
)

urlpatterns = [
    path('', TripListView.as_view(), name='trip-list'),
    path('create/', TripCreateView.as_view(), name='trip-create'),
    path('<int:pk>/', TripDetailView.as_view(), name='trip-detail'),
    path('<int:pk>/update/', TripUpdateView.as_view(), name='trip-update'),
    path('<int:pk>/delete/', TripDeleteView.as_view(), name='trip-delete'),
    path('public/', PublicTripListView.as_view(), name='public-trips'),
    path('user/<int:user_id>/', UserTripsView.as_view(), name='user-trips'),
    path('joined/<int:user_id>/', JoinedTripsView.as_view(), name='joined-trips'),
]
