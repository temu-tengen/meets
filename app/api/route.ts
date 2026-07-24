import { pusherServer } from '../anchat/lib/pusherServer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, username } = await req.json();

    if (!text || !username) {
      return NextResponse.json({ error: 'Message text and username are required' }, { status: 400 });
    }

    if (!pusherServer) {
      return NextResponse.json({ error: 'Pusher is not configured' }, { status: 500 });
    }

    await pusherServer.trigger('chat-room', 'upcoming-message', {
      text,
      username,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send message', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}