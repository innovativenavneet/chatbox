import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm max-w-xs mx-auto">
      <p className="text-gray-800">{message}</p>
    </div>
  );
};

export default ChatMessage;
