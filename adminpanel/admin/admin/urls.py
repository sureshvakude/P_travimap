from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

admin.site.site_header = "Travimap administration"
admin.site.site_title = "Travimap Admin Portal"
admin.site.index_title = "Welcome to Travimap Admin Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)