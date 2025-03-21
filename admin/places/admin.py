from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ExportMixin, ImportExportModelAdmin
from import_export import resources
from .models import Place, PlaceImage

# Resource for Import/Export (Places)
class PlaceResource(resources.ModelResource):
    class Meta:
        model = Place

# Resource for Import/Export (Place Images)
class PlaceImageResource(resources.ModelResource):
    class Meta:
        model = PlaceImage

# Inline model for uploading multiple images
class PlaceImageInline(admin.TabularInline):
    model = PlaceImage
    extra = 1

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" height="60" />') if obj.image else ""

    image_preview.short_description = "Preview"
    readonly_fields = ('image_preview',)

# Admin model for Place
class PlaceAdmin(ImportExportModelAdmin, ExportMixin, admin.ModelAdmin):
    resource_class = PlaceResource
    list_display = ('name', 'category', 'region', 'state', 'rating', 'likes')
    search_fields = ('name', 'category', 'region', 'state', 'nearby_city')
    list_filter = ('category', 'region', 'state')
    inlines = [PlaceImageInline]

# Admin model for Place Images
class PlaceImageAdmin(ImportExportModelAdmin, ExportMixin, admin.ModelAdmin):
    resource_class = PlaceImageResource
    list_display = ('place', 'image_preview')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" height="60" />') if obj.image else ""

    image_preview.short_description = "Preview"

admin.site.register(Place, PlaceAdmin)
admin.site.register(PlaceImage, PlaceImageAdmin)
