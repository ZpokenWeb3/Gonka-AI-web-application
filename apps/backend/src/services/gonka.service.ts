import { resolveEndpoints, GonkaOpenAI } from 'gonka-openai';

const GONKA_SOURCE_URL = process.env.GONKA_SOURCE_URL!;
const GONKA_PRIVATE_KEY = process.env.GONKA_PRIVATE_KEY!;

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

      return new GonkaOpenAI({
        gonkaPrivateKey: GONKA_PRIVATE_KEY,
        endpoints,
      });
    })();
  }

  return clientPromise;
}

export async function gonkaChat(
    message: string,
    model = 'Qwen/QwQ-32B'
) {
  const client = await getClient();

  return client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: message }],
  });
}

export async function gonkaGetEndpoints() {
  if (!endpointsPromise) {
    endpointsPromise = resolveEndpoints({
      sourceUrl: GONKA_SOURCE_URL,
    });
  }

  return endpointsPromise;
}
