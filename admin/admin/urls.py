from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin

admin.site.site_header = "Travimap Admin Panel"
admin.site.site_title = "Travimap Admin"
admin.site.index_title = "Welcome to Travimap Admin Dashboard"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('users.urls')),
    path('api/trip/', include('trips.urls')),
    path('api/post/', include('posts.urls')),
    path('api/place/', include('places.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)