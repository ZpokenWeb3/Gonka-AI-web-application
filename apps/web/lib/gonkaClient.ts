import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

function getAuthTokenCookie(): string | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) =>
        row.startsWith("gonka_token=")
    );

    if (!tokenCookie) return null;

    const token = tokenCookie.split("=")[1];
    return token || null;
}

export async function sendGonkaChatMessage(
  message: string,
  sessionId: string,
  model: string = 'Qwen/Qwen3-235B-A22B-Instruct-2507-FP8'
) {
  try {
    const token = getAuthTokenCookie();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(`${API_BASE_URL}/chats/${sessionId}/send`, {
      message,
      model,
    }, { headers });

    const data = response.data;
    console.log('Chat Response:', data);

    if (data.success) {
      return {
        choices: [{
          message: {
            content: data.data.assistantMessage.content
          }
        }]
      };
    } else {
      throw new Error(data.message || 'Failed to send message');
    }
  } catch (error: any) {
    console.error('Ошибка при отправке сообщения:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(`Не удалось отправить сообщение: ${error.response.data.message}`);
    }
    if (error instanceof Error) {
      throw new Error(`Не удалось отправить сообщение: ${error.message}`);
    }
    throw new Error('Неизвестная ошибка при отправке сообщения');
  }
}



