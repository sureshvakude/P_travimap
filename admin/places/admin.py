from django.contrib import admin
from django.utils.html import format_html
from .models import Place, PlaceImage

# Inline model for uploading multiple images
class PlaceImageInline(admin.TabularInline):
    model = PlaceImage
    extra = 1  # Allows adding one image at a time in admin

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" height="60" />') if obj.image else ""

    image_preview.short_description = "Preview"
    readonly_fields = ('image_preview',)

# Admin model
class PlaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'region', 'state', 'rating', 'likes')
    search_fields = ('name', 'category', 'region', 'state', 'nearby_city')
    list_filter = ('category', 'region', 'state')
    inlines = [PlaceImageInline]  # Allow image uploads in admin

admin.site.register(Place, PlaceAdmin)
admin.site.register(PlaceImage)
