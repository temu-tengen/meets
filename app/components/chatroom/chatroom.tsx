'use client';

import { useEffect, useState } from 'react';
import PusherClient from 'pusher-js';

interface Message {
  text: string;
  username: string;
  timestamp: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('Anonymous');

  useEffect(() => {
    // Initialize Pusher Client
    const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.PUSHER_APP_CLUSTER!,
    });

    // Subscribe to the channel
    const channel = pusher.subscribe('chat-room');

    // Bind to the event triggered by our server API
    channel.bind('upcoming-message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup subscription on unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Send the message payload to our API route handler
    await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/center' },
      body: JSON.stringify({ text: input, username }),
    });

    setInput('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ border: '1px solid #ccc', height: '400px', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.username}: </strong> {msg.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ width: '25%', padding: '5px' }}
        />
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          style={{ flexGrow: 1, padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 15px' }}>Send</button>
      </form>
    </div>
  );
}