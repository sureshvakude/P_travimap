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
        fields = ['id', 'user', 'name', 'caption', 'images']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        post = Post.objects.create(**validated_data)
        
        for image in images_data:
            PostImage.objects.create(post=post, image=image)
        
        return post

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        
        # Update post data
        instance.name = validated_data.get('name', instance.name)
        instance.caption = validated_data.get('caption', instance.caption)
        instance.likes = validated_data.get('likes', instance.likes)
        instance.save()

        # Handle image updates if any
        for image in images_data:
            PostImage.objects.create(post=instance, image=image)

        return instance
