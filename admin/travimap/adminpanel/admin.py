from django.contrib import admin
from django.utils.html import format_html
from .models import User, Place, Post, Trip

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'mobile_number', 'gender', 'role', 'profile_picture_preview')
    
    def profile_picture_preview(self, obj):
        return format_html(f'<img src="{obj.profile_picture.url}" width="50" height="50" style="border-radius:50%;" />')

class PlaceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'region', 'rating', 'image_preview')

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.img.url}" width="100" height="100" />')

class PostAdmin(admin.ModelAdmin):
    list_display = ('name', 'caption', 'like', 'image_preview')

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.img.url}" width="100" height="100" />')

class TripAdmin(admin.ModelAdmin):
    list_display = ('name', 'destination', 'budget', 'type', 'image_preview')

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.img.url}" width="100" height="100" />')

admin.site.register(User, UserAdmin)
admin.site.register(Place, PlaceAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Trip, TripAdmin)