import { resolveEndpoints, GonkaOpenAI } from 'gonka-openai';
import { NextRequest, NextResponse } from 'next/server';

const GONKA_SOURCE_URL = process.env.NEXT_PUBLIC_GONKA_SOURCE_URL;
const GONKA_PRIVATE_KEY = process.env.NEXT_PUBLIC_GONKA_PRIVATE_KEY;

let clientPromise: Promise<GonkaOpenAI> | null = null;
let endpointsPromise: Promise<any> | null = null;

async function getGonkaClient(): Promise<GonkaOpenAI> {
  if (!clientPromise) {
    clientPromise = (async () => {
      if (!endpointsPromise) {
        endpointsPromise = resolveEndpoints({ sourceUrl: GONKA_SOURCE_URL });
      }
      const endpoints = await endpointsPromise;

      const client = new GonkaOpenAI({
        gonkaPrivateKey: GONKA_PRIVATE_KEY,
        endpoints,
      });

      return client;
    })();
  }

  return clientPromise;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, model = 'Qwen/Qwen3-235B-A22B-Instruct-2507-FP8' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const client = await getGonkaClient();

    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: message }],
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Gonka AI:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message', 
        message: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}

