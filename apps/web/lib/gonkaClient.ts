export async function sendGonkaChatMessage(
  message: string,
  model: string = 'Qwen/Qwen3-235B-A22B-Instruct-2507-FP8'
) {
  try {
    const response = await fetch('/api/gonka/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, model }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Gonka AI Response:', data);

    const content = data.choices?.[0]?.message?.content;
    if (content) {
      console.log('Ответ AI:', content);
    }

    return data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Gonka AI:', error);
    
    if (error instanceof Error) {
      throw new Error(`Не удалось отправить сообщение: ${error.message}`);
    }
    
    throw new Error('Неизвестная ошибка при отправке сообщения');
  }
}



