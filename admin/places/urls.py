from django.urls import path
from .views import PlaceListView, PlaceDetailView, PlaceUpdateView

urlpatterns = [
    path('places/', PlaceListView.as_view(), name='place-list'),
    path('places/<int:pk>/', PlaceDetailView.as_view(), name='place-detail'),
    path('places/<int:pk>/update/', PlaceUpdateView.as_view(), name='place-update'),  # Add this line
]