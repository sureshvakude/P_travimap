from django.contrib import admin
from .models import Trip, Itinerary

class ItineraryInline(admin.TabularInline):
    model = Itinerary
    extra = 1  # Number of empty fields to display for activities on each day

class TripAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'destination', 'startDate', 'endDate', 'budget', 'type', 'created_at')
    search_fields = ('name', 'destination', 'user__username')
    list_filter = ('user', 'type', 'startDate', 'endDate')
    ordering = ('-created_at',)  # Order trips by creation date in descending order

    fieldsets = (
        (None, {'fields': ('user', 'name', 'destination', 'startDate', 'endDate', 'budget', 'explorePlaces', 'itinerary', 'type', 'tripMembers', 'img')}),  
        # 'itinerary' field will appear as JSON data input
    )

    inlines = [ItineraryInline]  # Allows adding itinerary entries for the trip

admin.site.register(Trip, TripAdmin)
