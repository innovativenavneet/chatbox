import React from 'react';

const ChatRoomHeader = ({ userId }) => {
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Chat with User {userId}</h2>
      <button className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800">
        Close Chat
      </button>
    </div>
  );
};

export default ChatRoomHeader;
