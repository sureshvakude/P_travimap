from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Trip, TripImage, Itinerary

# Define resource classes for import/export
class TripResource(resources.ModelResource):
    class Meta:
        model = Trip

class TripImageResource(resources.ModelResource):
    class Meta:
        model = TripImage

class ItineraryResource(resources.ModelResource):
    class Meta:
        model = Itinerary

# Inline model for uploading multiple images
class TripImageInline(admin.TabularInline):
    model = TripImage
    extra = 1  # Allows adding one image at a time in admin

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" height="60" />') if obj.image else ""

    image_preview.short_description = "Preview"
    readonly_fields = ('image_preview',)

# Inline model for adding itinerary
class ItineraryInline(admin.TabularInline):
    model = Itinerary
    extra = 1  # Allows adding itinerary items one at a time

# Admin model with import/export
@admin.register(Trip)
class TripAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'user', 'destination', 'start_date', 'end_date', 'budget', 'trip_type', 'created_at')
    search_fields = ('name', 'user__username', 'destination', 'trip_type')
    list_filter = ('trip_type', 'created_at')
    inlines = [TripImageInline, ItineraryInline]  # Allow image & itinerary uploads in admin
    resource_class = TripResource

@admin.register(TripImage)
class TripImageAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('trip', 'image')
    resource_class = TripImageResource

@admin.register(Itinerary)
class ItineraryAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('trip', 'day', 'activities')
    resource_class = ItineraryResource
