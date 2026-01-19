import { resolveEndpoints, GonkaOpenAI } from 'gonka-openai';

const GONKA_SOURCE_URL = process.env.GONKA_SOURCE_URL?.replace(/\/$/, '');
const GONKA_PRIVATE_KEY = process.env.GONKA_PRIVATE_KEY;

let clientPromise: Promise<any> | null = null;
let endpointsPromise: Promise<any> | null = null;

async function getClient(): Promise<any> {
  if (!clientPromise) {
    clientPromise = (async () => {
      if (!endpointsPromise) {
        endpointsPromise = resolveEndpoints({
          sourceUrl: GONKA_SOURCE_URL,
        });
      }

      const endpoints = await endpointsPromise;
      console.log("Gonka endpoints resolved:", endpoints);

      return new GonkaOpenAI({
        apiKey: GONKA_SOURCE_URL,
        gonkaPrivateKey: GONKA_PRIVATE_KEY,
        endpoints,
      });
    })();
  }

  return clientPromise;
}

export async function gonkaChat(
    message: string,
    model = 'Qwen/Qwen3-32B-FP8'
) {
  const client = await getClient();
  
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [{ role: 'user', content: message }],
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function gonkaGetEndpoints() {
  if (!endpointsPromise) {
    endpointsPromise = resolveEndpoints({
      sourceUrl: GONKA_SOURCE_URL,
    });
  }

  return endpointsPromise;
}