import { NextResponse } from 'next/server';

export async function POST() {
  const OPENVIDU_URL = 'http://localhost:4443';
  const OPENVIDU_SECRET = 'sixbee101';

  try {
    console.log('Creating session on OpenVidu server...');
    const sessionResponse = await fetch(`${OPENVIDU_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`OPENVIDUAPP:${OPENVIDU_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customSessionId: 'YOUR_SESSION_ID' }),
    });

    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text();
      console.error('Failed to create session:', errorText);
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 },
      );
    }

    const sessionData = await sessionResponse.json();
    console.log('Session created:', sessionData);

    console.log('Requesting token from OpenVidu server...');
    const tokenResponse = await fetch(`${OPENVIDU_URL}/api/tokens`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`OPENVIDUAPP:${OPENVIDU_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session: sessionData.id }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to retrieve token:', errorText);
      return NextResponse.json(
        { error: 'Failed to retrieve token' },
        { status: 500 },
      );
    }

    const tokenData = await tokenResponse.json();
    console.log('Token retrieved:', tokenData);

    return NextResponse.json({ token: tokenData.token });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 },
    );
  }
}
