from django.urls import path
from .views import PlaceListView, PlaceDetailView

urlpatterns = [
    path('places/', PlaceListView.as_view(), name='place-list'),
    path('places/<int:pk>/', PlaceDetailView.as_view(), name='place-detail'),
]