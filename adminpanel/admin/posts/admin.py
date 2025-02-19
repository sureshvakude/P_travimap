from django.contrib import admin
from .models import Post, PostImage

class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1  # Number of empty fields to display for images

class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'likes', 'created_at')
    search_fields = ('name', 'caption', 'user__username')
    list_filter = ('user', 'likes')
    ordering = ('-created_at',)  # Order posts by creation date in descending order

    fieldsets = (
        (None, {'fields': ('user', 'name', 'caption', 'likes', 'comments')}),
        # No need to include 'created_at' because it's non-editable
    )

    # Optionally, exclude 'created_at' field from form:
    exclude = ('created_at',)  # This will prevent the field from being shown in the form

    inlines = [PostImageInline]  # Allows adding multiple images for the post

admin.site.register(Post, PostAdmin)