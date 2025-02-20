from django.contrib import admin
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from import_export import resources, fields
from import_export.widgets import ManyToManyWidget
from .models import Post, PostImage, PostComment

# Import/Export Resource Class
class PostResource(resources.ModelResource):
    images = fields.Field(column_name="images", attribute="images", widget=ManyToManyWidget(PostImage, field="image"))
    comments = fields.Field(column_name="comments", attribute="comments", widget=ManyToManyWidget(PostComment, field="message"))

    class Meta:
        model = Post
        fields = ('id', 'user', 'name', 'caption', 'likes', 'created_at', 'images', 'comments')

    def dehydrate_images(self, post):
        """Returns a comma-separated list of image URLs."""
        return ", ".join([image.image.url for image in post.images.all()])

    def dehydrate_comments(self, post):
        """Returns comments with user info in export."""
        return "; ".join([f"{comment.user.username}: {comment.message}" for comment in post.comments.all()])

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

# Admin model with import/export functionality
class PostAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = PostResource  # Import/Export support
    list_display = ('name', 'user', 'likes', 'created_at')
    search_fields = ('name', 'user__username', 'caption')
    list_filter = ('created_at',)
    inlines = [PostImageInline, PostCommentInline]  # Allow image & comment uploads in admin

admin.site.register(Post, PostAdmin)
admin.site.register(PostImage)
admin.site.register(PostComment)
