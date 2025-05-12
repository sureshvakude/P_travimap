from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('users.urls')),
    path('api/place/', include('places.urls')),
    path('api/post/', include('posts.urls')),
    path('api/trip/', include('trips.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
