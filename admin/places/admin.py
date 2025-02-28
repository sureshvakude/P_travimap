from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from import_export import resources, fields
from import_export.widgets import ManyToManyWidget
from .models import Place, PlaceImage

# Import/Export Resource Class
class PlaceResource(resources.ModelResource):
    images = fields.Field(column_name="images", attribute="images", widget=ManyToManyWidget(PlaceImage, field="image"))

    class Meta:
        model = Place
        fields = ('id', 'name', 'description', 'likes', 'nearby_city', 'category', 'region', 
                  'best_time_to_visit', 'state', 'distance_from_nearby_place', 'rating', 'images')

    def dehydrate_images(self, place):
        """Returns a comma-separated list of image URLs."""
        return ", ".join([image.image.url for image in place.images.all()])

# Inline model for uploading multiple images
class PlaceImageInline(admin.TabularInline):
    model = PlaceImage
    extra = 1  # Allows adding one image at a time in admin

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" height="60" />') if obj.image else ""

    image_preview.short_description = "Preview"
    readonly_fields = ('image_preview',)

# Admin model with import/export functionality
class PlaceAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = PlaceResource  # Import/Export support
    list_display = ('name', 'category', 'region', 'state', 'rating', 'likes')
    search_fields = ('name', 'category', 'region', 'state', 'nearby_city')
    list_filter = ('category', 'region', 'state')
    inlines = [PlaceImageInline]  # Allow image uploads in admin

admin.site.register(Place, PlaceAdmin)
admin.site.register(PlaceImage)
