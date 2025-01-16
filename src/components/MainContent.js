import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage, closeWebSocket } from '../services/websocketService';
import ChatRoomHeader from './ChatRoomHeader';
import ChatMessage from './ChatMessage';

const MainContent = ({ selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem('user')) || {}; // Retrieve logged-in user data

  useEffect(() => {
    if (currentUser.id && selectedUserId) {
      const socket = connectWebSocket(setMessages, currentUser.id, selectedUserId);

      // Fetch previous messages from the backend
      fetchMessages(currentUser.id, selectedUserId);

      // Clean up the WebSocket connection when component unmounts
      return () => closeWebSocket(socket);
    }
  }, [currentUser.id, selectedUserId]);

  const fetchMessages = async (senderId, receiverId) => {
    const response = await fetch(`/api/messages/${senderId}/${receiverId}/`);
    if (response.ok) {
      const data = await response.json();
      setMessages(data.messages);
    } else {
      console.error('Failed to fetch messages');
    }
  };

  const handleMessageChange = (event) => setMessage(event.target.value);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, currentUser.id, selectedUserId);
      setMessage(""); // Clear message input after sending
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatRoomHeader userId={selectedUserId} />
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} />
          ))}
        </div>
      </div>
      <div className="flex items-center p-4 bg-white shadow-md">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type a message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MainContent;
