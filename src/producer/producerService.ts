import { RabbitMQConnection } from '../rabbitmqConnection';
import logger from '../utils/logger';
import config from '../config';

export class ProducerService {
  private channel: any;

  constructor() {
    RabbitMQConnection.getInstance()
      .getChannel()
      .then(channel => {
        this.channel = channel;
        logger.info('Producer channel initialized');
      })
      .catch(error => {
        logger.error('Failed to create producer:', this.formatError(error));
      });
  }

  public async sendToQueue(message: string) {
    if (!this.channel) {
      logger.error('Channel is not initialized');
      return;
    }

    try {
      logger.info(`Attempting to assert queue: ${config.queueName}`);
      await this.channel.assertQueue(config.queueName, { durable: true });
      logger.info(`Queue ${config.queueName} asserted`);

      logger.info(`Sending message to queue: ${config.queueName}`);
      this.channel.sendToQueue(config.queueName, Buffer.from(message), { persistent: true });
      logger.info(`Message sent: ${message}`);
    } catch (error) {
      logger.error('Failed to send message:', this.formatError(error));
    }
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return JSON.stringify(error);
  }
}
