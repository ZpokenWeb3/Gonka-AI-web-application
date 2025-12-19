import { resolveEndpoints } from 'gonka-openai';
import { NextResponse } from 'next/server';

const GONKA_SOURCE_URL = process.env.NEXT_PUBLIC_GONKA_SOURCE_URL;

export async function GET() {
  try {
    const endpoints = await resolveEndpoints({ sourceUrl: GONKA_SOURCE_URL });
    return NextResponse.json({ endpoints });
  } catch (error) {
    console.error('Ошибка при получении endpoints:', error);
    return NextResponse.json(
      { error: 'Failed to get endpoints', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

