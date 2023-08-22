import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:8000'); // Replace with your server's URL

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    // Send a message to the server
    socket.emit('message', message);
  };

  return (
    <div>
      <h1>WebSocket Component</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage('Hello, server!')}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
