from django.urls import path
from .views import (
    GetAllPlacesView, GetSinglePlaceView, GetPlacesByStateView, GetPlacesByCategoryView
)

urlpatterns = [
    path('places/all/', GetAllPlacesView.as_view(), name='get_all_places'),
    path('places/<int:pk>/', GetSinglePlaceView.as_view(), name='get_single_place'),
    path('places/state/<str:state>/', GetPlacesByStateView.as_view(), name='get_places_by_state'),
    path('places/category/<str:category>/', GetPlacesByCategoryView.as_view(), name='get_places_by_category'),
]
