// /src/app/api/mock/conversations/route.ts




import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: '1', title: 'Mock Chat: GPT Intro' },
    { id: '2', title: 'Mock Chat: Project Alpha' },
    { id: '3', title: 'Mock Chat: Excel Upload Debug' },
    { id: '4', title: 'Mock Chat: GPT Intro' },
    { id: '5', title: 'Mock Chat: GPT Intro' },
    { id: '6', title: 'Mock Chat: Project Alpha' },
    { id: '7', title: 'Mock Chat: Excel Upload Debug' },
    { id: '8', title: 'Mock Chat: GPT Intro' },
    { id: '9', title: 'Mock Chat: GPT Intro' },
    { id: '10', title: 'Mock Chat: Project Alpha' },
    { id: '11', title: 'Mock Chat: Excel Upload Debug' },
    { id: '12', title: 'Mock Chat: GPT Intro' },

  ]);
}
