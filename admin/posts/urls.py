from django.urls import path
from .views import (
    GetAllPostsView, GetSinglePostView, CreatePostView,
    UpdatePostView, DeletePostView
)

urlpatterns = [
    path('posts/', GetAllPostsView.as_view(), name='get_all_posts'),
    path('posts/<int:pk>/', GetSinglePostView.as_view(), name='get_single_post'),
    path('posts/create/', CreatePostView.as_view(), name='create_post'),
    path('posts/update/<int:pk>/', UpdatePostView.as_view(), name='update_post'),
    path('posts/delete/<int:pk>/', DeletePostView.as_view(), name='delete_post'),
]
