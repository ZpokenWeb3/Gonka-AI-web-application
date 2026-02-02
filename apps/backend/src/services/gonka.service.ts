const GONKA_SOURCE_URL = process.env.GONKA_SOURCE_URL?.replace(/\/$/, '');
const GONKA_PRIVATE_KEY = process.env.GONKA_PRIVATE_KEY;

type GonkaSdk = typeof import('gonka-openai');

let sdkPromise: Promise<GonkaSdk> | null = null;
let clientPromise: Promise<any> | null = null;
let endpointsPromise: Promise<any> | null = null;

async function getSdk(): Promise<GonkaSdk> {
  if (!sdkPromise) {
    const dynamicImport = new Function(
      'modulePath',
      'return import(modulePath);',
    ) as (modulePath: string) => Promise<GonkaSdk>;

    sdkPromise = dynamicImport('gonka-openai');
  }

  return sdkPromise;
}

async function getClient(): Promise<any> {
  if (!clientPromise) {
    clientPromise = (async () => {
      const { resolveEndpoints, GonkaOpenAI } = await getSdk();

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
    const { resolveEndpoints } = await getSdk();

    endpointsPromise = resolveEndpoints({
      sourceUrl: GONKA_SOURCE_URL,
    });
  }

  return endpointsPromise;
}