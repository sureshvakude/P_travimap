from django.urls import path
from .views import (
    GetAllPlacesView, GetSinglePlaceView,
)

urlpatterns = [
    path('places/all/', GetAllPlacesView.as_view(), name='get_all_places'),
    path('places/<int:pk>/', GetSinglePlaceView.as_view(), name='get_single_place'),
]
