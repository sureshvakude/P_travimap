from django.urls import path
from .views import RegisterView, LoginView, LogoutView, GetUserView, GetAllUsersView, UpdateUserView, DeleteUserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/<int:pk>/', GetUserView.as_view(), name='get_single_user'),
    path('user/update/<int:pk>/', UpdateUserView.as_view(), name='update_user'),
    path('user/delete/<int:pk>/', DeleteUserView.as_view(), name='delete_user'),
    path('users/', GetAllUsersView.as_view(), name='get_all_users'),
]
