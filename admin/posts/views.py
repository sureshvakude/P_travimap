from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer

# Get all posts
class GetAllPostsView(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

# Get a single post
class GetSinglePostView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

# Create a new post
class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Assign the logged-in user to the post

# Update a post
class UpdatePostView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionError("You can only update your own posts")
        serializer.save()

# Delete a post
class DeletePostView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionError("You can only delete your own posts")
        instance.delete()
