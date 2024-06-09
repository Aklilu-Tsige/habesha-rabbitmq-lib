import { Request, Response } from 'express';
import { ProducerService } from '../producer/producerService';
import { ConsumerService } from '../consumer/consumerService';
import logger from '../utils/logger';

const producerService = new ProducerService();
const consumerService = new ConsumerService();

export const sendMessage = async (req: Request, res: Response) => {
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  const { queue, message } = req.body;

  if (!queue || !message) {
    res.status(400).send('Queue and message are required');
    return;
  }

  try {
    await producerService.sendToQueue(message);
    res.send('Message sent');
  } catch (error) {
    logger.error('Failed to send message', error);
    res.status(500).send('Failed to send message');
  }
};

export const consumeMessage = async (req: Request, res: Response) => {
  const { queue } = req.body;

  if (!queue) {
    res.status(400).send('Queue is required');
    return;
  }

  try {
    await consumerService.startConsuming(queue);
    res.send(`Started consuming messages from ${queue}`);
  } catch (error) {
    logger.error('Failed to consume message', error);
    res.status(500).send('Failed to consume message');
  }
};
