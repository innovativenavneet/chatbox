# chat/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from django.contrib.auth.models import User
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']  # Get the authenticated user
        self.other_user_id = self.scope['url_route']['kwargs']['other_user_id']
        self.room_name = f"chat_{self.user.id}_{self.other_user_id}"
        self.room_group_name = f"chat_{self.user.id}_{self.other_user_id}"

        # Join the chat group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Send old messages (fetch from the database)
        messages = await self.get_old_messages()
        await self.send(text_data=json.dumps({
            'messages': messages
        }))

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the chat group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Handle incoming message
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Save message to the database
        sender = self.user
        receiver = await self.get_user(self.other_user_id)
        await self.save_message(sender, receiver, message)

        # Broadcast message to the WebSocket group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        # Send message to WebSocket
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @sync_to_async
    def get_old_messages(self):
        # Fetch past 50 messages between users
        messages = Message.objects.filter(
            (Q(sender=self.user) & Q(receiver_id=self.other_user_id)) |
            (Q(sender_id=self.other_user_id) & Q(receiver=self.user))
        ).order_by('timestamp')[:50]
        return [{"sender": msg.sender.username, "message": msg.message} for msg in messages]

    @sync_to_async
    def save_message(self, sender, receiver, message):
        Message.objects.create(sender=sender, receiver=receiver, message=message)

    @sync_to_async
    def get_user(self, user_id):
        return User.objects.get(id=user_id)
