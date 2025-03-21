from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Post, PostImage, PostComment

# Define resource classes for import/export
class PostResource(resources.ModelResource):
    class Meta:
        model = Post

class PostImageResource(resources.ModelResource):
    class Meta:
        model = PostImage

class PostCommentResource(resources.ModelResource):
    class Meta:
        model = PostComment

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

# Admin model with import/export
@admin.register(Post)
class PostAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('name', 'user', 'likes', 'created_at')
    search_fields = ('name', 'user__username', 'caption')
    list_filter = ('created_at',)
    inlines = [PostImageInline, PostCommentInline]
    resource_class = PostResource

@admin.register(PostImage)
class PostImageAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('post', 'image')
    resource_class = PostImageResource

@admin.register(PostComment)
class PostCommentAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ('post', 'user', 'message', 'created_at')
    resource_class = PostCommentResource
