import json
from django.contrib.auth import authenticate, login, get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView
from django.db.models import Q
import logging

# Logger setup
logger = logging.getLogger(__name__)

# User model (Django's default User model or custom)
User = get_user_model()

# Home View
class HomeView(TemplateView):
    template_name = 'home.html'

# Signup View
@csrf_exempt
@require_http_methods(["POST"])
def signup_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already registered.'}, status=400)

        # Create the user
        user = User.objects.create_user(
            username=email.split('@')[0],
            email=email,
            password=password
        )

        # Specify the backend explicitly when logging in
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')

        return JsonResponse({'message': 'Signup successful!'}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    except Exception as e:
        logger.error(f"Signup error: {e}")
        return JsonResponse({'error': 'An unexpected error occurred.'}, status=500)

# Login View
@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required.'}, status=400)

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        if user is None:
            return JsonResponse({'error': 'Invalid email or password.'}, status=400)

        # Specify the backend explicitly when logging in
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')

        return JsonResponse({'message': 'Login successful!'}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    except Exception as e:
        logger.error(f"Login error: {e}")
        return JsonResponse({'error': 'An unexpected error occurred.'}, status=500)

# Fetch messages for a chat conversation
@csrf_exempt
@require_http_methods(["GET"])
def get_messages(request, user_id, other_user_id):
    try:
        # Fetch messages between two users from the Message model
        messages = Message.objects.filter(
            (Q(sender_id=user_id) & Q(receiver_id=other_user_id)) |
            (Q(sender_id=other_user_id) & Q(receiver_id=user_id))
        ).order_by('timestamp')

        message_data = [{"message": msg.message, "sender": msg.sender.username} for msg in messages]
        return JsonResponse({"messages": message_data}, status=200)
    
    except Exception as e:
        logger.error(f"Error fetching messages: {e}")
        return JsonResponse({'error': 'An unexpected error occurred while fetching messages.'}, status=500)

# Fetch all users
@require_http_methods(["GET"])
def get_all_users(request):
    try:
        users = User.objects.all()  # Fetch all users
        user_data = [{"id": user.id, "username": user.username} for user in users]
        return JsonResponse({"users": user_data}, status=200)
    except Exception as e:
        logger.error(f"Error fetching users: {e}")
        return JsonResponse({'error': 'An unexpected error occurred while fetching users.'}, status=500)
