import { pusherServer } from '../anchat/lib/pusherServer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, username } = await req.json();

    // Trigger an event named 'upcoming-message' on a channel named 'chat-room'
    await pusherServer.trigger('chat-room', 'upcoming-message', {
      text,
      username,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}