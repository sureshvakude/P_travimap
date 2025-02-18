from django.contrib import admin
from .models import Place, PlaceImage

class PlaceImageInline(admin.TabularInline):  # Allows adding multiple images inline
    model = PlaceImage
    extra = 1  # Number of empty image fields to display

class PlaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'region', 'state', 'rating', 'likes')
    search_fields = ('name', 'category', 'region', 'state', 'nearby_city')
    list_filter = ('category', 'region', 'state', 'best_time_to_visit')
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('name', 'description')}),
        ('Location Details', {'fields': ('nearby_city', 'category', 'region', 'state', 'distance_from_nearby_place')}),
        ('Additional Info', {'fields': ('best_time_to_visit', 'rating', 'likes')}),
    )

    inlines = [PlaceImageInline]  # Adds an inline section to upload multiple images

admin.site.register(Place, PlaceAdmin)