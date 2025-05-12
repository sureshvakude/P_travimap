from django.db import models
import os
from django.dispatch import receiver
from users.models import User  # Import User model
from django.core.exceptions import ValidationError

# Function to validate image size
def validate_image_size(image):
    max_size = 100 * 1024  # 100KB
    if image.size > max_size:
        raise ValidationError("Image file size must not exceed 100KB.")

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")  # Link to User
    name = models.CharField(max_length=255)
    caption = models.TextField(blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)  # Auto timestamp

    class Meta:
        db_table = "posts"  # Set table name in the database

    def __str__(self):
        return self.name

class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="posts/", validators=[validate_image_size])

    def __str__(self):
        return f"Image for {self.post.name}"

    def delete(self, *args, **kwargs):
        """Delete image file from storage when the instance is deleted."""
        if self.image and os.path.isfile(self.image.path):
            os.remove(self.image.path)  # Remove file from file system
        super().delete(*args, **kwargs)

# Signal to delete image files when a PostImage is deleted
@receiver(models.signals.post_delete, sender=PostImage)
def auto_delete_post_image_on_delete(sender, instance, **kwargs):
    """Deletes image file from storage when corresponding PostImage object is deleted."""
    if instance.image and os.path.isfile(instance.image.path):
        os.remove(instance.image.path)

# Signal to delete all related images when a Post is deleted
@receiver(models.signals.pre_delete, sender=Post)
def delete_related_post_images(sender, instance, **kwargs):
    """Deletes all related PostImage objects and their files when a Post is deleted."""
    for image in instance.images.all():
        image.delete()  # This will call the overridden delete method and remove the image file

class PostComment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Commenter's User ID
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # Show latest comments first

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.name}"
