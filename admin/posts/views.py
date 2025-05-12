from rest_framework import generics, filters
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer, PostCreateUpdateSerializer
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination

# Custom Pagination
class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

# API to get all posts with query filters
class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = CustomPagination
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ['name', 'caption']

    def get_queryset(self):
        queryset = Post.objects.all()
        user_id = self.request.query_params.get('user_id')  # Filter by user ID
        query = self.request.query_params.get('query')  # Search by name or caption

        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        if query:
            queryset = queryset.filter(Q(name__icontains=query) | Q(caption__icontains=query))

        return queryset

# API to get a single post by ID
class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# API to create a new post
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostCreateUpdateSerializer

# API to update an existing post (PATCH)
class PostUpdateView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateUpdateSerializer

# API to delete a post (flag change)
class PostDeleteView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
