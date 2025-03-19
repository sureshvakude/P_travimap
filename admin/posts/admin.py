from django.contrib import admin
from django.utils.html import format_html
from .models import Post, PostImage, PostComment

# Inline model for uploading multiple images
class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1  # Allows adding one image at a time in admin

    def image_preview(self, obj):
        return format_html(f'<img src="{obj.image.url}" width="100" height="60" />') if obj.image else ""

    image_preview.short_description = "Preview"
    readonly_fields = ('image_preview',)

# Inline model for adding comments
class PostCommentInline(admin.TabularInline):
    model = PostComment
    extra = 1  # Allows adding one comment at a time

# Admin model
class PostAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'likes', 'created_at')
    search_fields = ('name', 'user__username', 'caption')
    list_filter = ('created_at',)
    inlines = [PostImageInline, PostCommentInline]  # Allow image & comment uploads in admin

admin.site.register(Post, PostAdmin)
admin.site.register(PostImage)
admin.site.register(PostComment)
