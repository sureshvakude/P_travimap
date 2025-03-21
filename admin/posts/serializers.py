from rest_framework import serializers
from .models import Post, PostImage, PostComment

# Serializer for Post Images
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'

# Serializer for Post Comments
class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = '__all__'

# Serializer for Posts
class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = PostCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'name', 'caption', 'likes', 'created_at', 'images', 'comments']
