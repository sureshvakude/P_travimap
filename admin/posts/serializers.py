from rest_framework import serializers
from .models import Post, PostImage, PostComment

# Serializer for PostImage
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image']

# Serializer for PostComment
class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = ['id', 'user', 'message', 'created_at']

# Serializer for Post (main post object)
class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = PostCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'name', 'caption', 'likes', 'created_at', 'images', 'comments']

# Serializer for creating/updating Post
class PostCreateUpdateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(write_only=True)  # To handle image data during creation

    class Meta:
        model = Post
        fields = ['id', 'user', 'name', 'caption', 'likes', 'images']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        post = Post.objects.create(**validated_data)
        
        for image in images_data:
            PostImage.objects.create(post=post, image=image)
        
        return post

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)  # None instead of empty list
        
        # Update post fields if they're in validated_data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle image updates only if images_data is provided
        if images_data is not None:
            # Clear existing images (optional - remove if you want to keep old images)
            instance.images.all().delete()
            
            # Create new images
            for image in images_data:
                PostImage.objects.create(post=instance, image=image)

        return instance
