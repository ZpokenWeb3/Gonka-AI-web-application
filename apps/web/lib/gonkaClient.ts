
import axios from 'axios';

export async function sendGonkaChatMessage(
  message: string,
  model: string = 'Qwen/Qwen3-235B-A22B-Instruct-2507-FP8'
) {
  try {
    const response = await axios.post('http://localhost:5000/api/gonka/chat', {
      message,
      model,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    console.log('Gonka AI Response:', data);

    const content = data.choices?.[0]?.message?.content;
    if (content) {
      console.log('Ответ AI:', content);
    } else {
      console.log('Ответ AI не найден в ответе:', data);
    }

   
    console.log('Полный ответ от AI:', JSON.stringify(data, null, 2));
    return data;
  } catch (error: any) {
    console.error('Ошибка при отправке сообщения в Gonka AI:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(`Не удалось отправить сообщение: ${error.response.data.message}`);
    }
    if (error instanceof Error) {
      throw new Error(`Не удалось отправить сообщение: ${error.message}`);
    }
    throw new Error('Неизвестная ошибка при отправке сообщения');
  }
}



