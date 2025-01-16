# chat_project/asgi.py

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from chat import consumers  # Import your ChatConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chat_project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # HTTP routes handled by Django
    "websocket": AuthMiddlewareStack(  # WebSocket connections with authentication middleware
        URLRouter([
            path('ws/chat/<int:other_user_id>/', consumers.ChatConsumer.as_asgi()),  # WebSocket route
        ])
    ),
})
