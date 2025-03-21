from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlaceViewSet, PlaceImageViewSet

router = DefaultRouter()
router.register(r'places', PlaceViewSet, basename='places')
router.register(r'place-images', PlaceImageViewSet, basename='place-images')

urlpatterns = [
    path('api/', include(router.urls)),
]
