from django.db import models
from users.models import User  # Import User model

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
    image = models.ImageField(upload_to="uploads/posts/")

    def __str__(self):
        return f"Image for {self.post.name}"

class PostComment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Commenter's User ID
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # Show latest comments first

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.name}"
