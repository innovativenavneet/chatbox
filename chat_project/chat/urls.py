# chat/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Existing URL patterns
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('home/', views.HomeView.as_view(), name='home'),
    
    # Add the new API URL pattern for getting all users
    path('api/users/', views.get_all_users, name='get_all_users'),
    
    # Messages endpoint (adjusted to match your pattern)
    path('api/messages/<int:user_id>/<int:other_user_id>/', views.get_messages, name='get_messages'),
]
