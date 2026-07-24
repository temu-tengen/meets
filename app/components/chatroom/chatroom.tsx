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
  const [status, setStatus] = useState('');

  useEffect(() => {
    const pusherKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? process.env.PUSHER_APP_CLUSTER;

    if (!pusherKey || !pusherCluster) {
      setStatus('Chat is unavailable until the Pusher credentials are configured.');
      return;
    }

    try {
      const pusher = new PusherClient(pusherKey, {
        cluster: pusherCluster,
      });

      const channel = pusher.subscribe('chat-room');
      channel.bind('upcoming-message', (data: Message) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    } catch (error) {
      console.error('Unable to initialize chat', error);
      setStatus('Chat could not be started. Please check the Pusher configuration.');
    }
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY || !process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER) {
      setStatus('Chat is unavailable until the Pusher credentials are configured.');
      return;
    }

    try {
      await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, username }),
      });

      setInput('');
      setStatus('');
    } catch (error) {
      console.error('Unable to send message', error);
      setStatus('The message could not be sent right now.');
    }
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

      {status ? <p style={{ color: '#b91c1c', marginTop: '8px' }}>{status}</p> : null}

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