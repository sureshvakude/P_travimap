from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    class Meta:
        db_table = 'posts'
    
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)  # Link to User model
    name = models.CharField(max_length=255)
    caption = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    comments = models.JSONField(default=list)  # Using JSONField to store an array of comments
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the post was created

    def __str__(self):
        return self.name

class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/post_images/')

    def __str__(self):
        return f"Image for post: {self.post.name}"