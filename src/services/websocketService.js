// src/services/websocketService.js

let socket = null;

// Function to connect to WebSocket with user IDs
const connectWebSocket = (setMessages, currentUserId, otherUserId) => {
  socket = new WebSocket(`ws://localhost:8000/ws/chat/${currentUserId}/${otherUserId}/`);

  // WebSocket connection opened
  socket.onopen = () => {
    console.log("WebSocket connection established.");
  };

  // Handle incoming WebSocket messages
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.message) {
      // Update the message list state in the React component
      setMessages((prevMessages) => [...prevMessages, data.message]);
    }
  };

  // Handle WebSocket errors
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  // Handle WebSocket connection closed
  socket.onclose = () => {
    console.log("WebSocket connection closed.");
  };

  return socket;
};

// Function to send a message over WebSocket
const sendMessage = (message, currentUserId, otherUserId) => {
  if (socket && message) {
    socket.send(JSON.stringify({ message, sender: currentUserId, receiver: otherUserId }));
  }
};

// Function to close the WebSocket connection
const closeWebSocket = () => {
  if (socket) {
    socket.close();  // Close the WebSocket connection
  }
};

export { connectWebSocket, sendMessage, closeWebSocket };
