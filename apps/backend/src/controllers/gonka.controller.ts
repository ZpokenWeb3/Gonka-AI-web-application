import { Request, Response } from 'express';
import { gonkaChat, gonkaGetEndpoints } from '../services/gonka.service';

export async function gonkaChatController(req: Request, res: Response) {
  try {
    const { message, model } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string',
      });
    }

    const response = await gonkaChat(message, model);
    return res.json(response);
  } catch (error) {
    console.error('Gonka chat error:', error);
    return res.status(500).json({
      error: 'Failed to send message to Gonka',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function gonkaEndpointsController(
    _req: Request,
    res: Response
) {
  try {
    const endpoints = await gonkaGetEndpoints();
    return res.json({ endpoints });
  } catch (error) {
    console.error('Gonka endpoints error:', error);
    return res.status(500).json({
      error: 'Failed to get endpoints',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
