from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from import_export import resources, fields
from import_export.widgets import ManyToManyWidget
from .models import Trip, TripImage, Itinerary
from import_export.widgets import ForeignKeyWidget
from users.models import User

# Import/Export Resource Class
class TripResource(resources.ModelResource):
    user = fields.Field(
        column_name="user", 
        attribute="user", 
        widget=ForeignKeyWidget(User, 'id')  # Match by user id
    )
    images = fields.Field(column_name="images", attribute="images", widget=ManyToManyWidget(TripImage, field="image"))
    trip_members = fields.Field(column_name="trip_members", attribute="trip_members", widget=ManyToManyWidget(User, field="username"))
    itinerary = fields.Field(column_name="itinerary", attribute="itinerary", widget=ManyToManyWidget(Itinerary, field="activities"))

    class Meta:
        model = Trip
        fields = ('id', 'user', 'name', 'destination', 'start_date', 'end_date', 'budget', 'explore_places', 
                  'trip_type', 'trip_members', 'created_at', 'images', 'itinerary')

    def dehydrate_images(self, trip):
        """Returns a comma-separated list of image URLs."""
        return ", ".join([image.image.url for image in trip.images.all()])

    def dehydrate_trip_members(self, trip):
        """Returns a list of trip member usernames."""
        return ", ".join([member.username for member in trip.trip_members.all()])

    def dehydrate_itinerary(self, trip):
        """Returns itinerary in 'Day: Activities' format."""
        return "; ".join([f"Day {i.day}: {i.activities}" for i in trip.itinerary.all()])

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

# Admin model with import/export functionality
class TripAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = TripResource  # Import/Export support
    list_display = ('name', 'user', 'destination', 'start_date', 'end_date', 'budget', 'trip_type', 'created_at')
    search_fields = ('name', 'user__username', 'destination', 'trip_type')
    list_filter = ('trip_type', 'created_at')
    inlines = [TripImageInline, ItineraryInline]  # Allow image & itinerary uploads in admin

admin.site.register(Trip, TripAdmin)
admin.site.register(TripImage)
admin.site.register(Itinerary)
