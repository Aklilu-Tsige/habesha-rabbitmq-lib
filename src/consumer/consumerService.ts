import { RabbitMQConnection } from '../rabbitmqConnection';
import logger from '../utils/logger';

export class ConsumerService {
  private channel: any;

  constructor() {
    RabbitMQConnection.getInstance()
      .getChannel()
      .then(channel => {
        this.channel = channel;
        logger.info('Consumer channel successfully retrieved');
      })
      .catch(error => {
        logger.error('Failed to create consumer:', this.formatError(error));
      });
  }

  public async startConsuming(queue: string) {
    if (!queue) {
      logger.error('Queue name is not defined');
      return;
    }

    if (!this.channel) {
      logger.error('Channel is not initialized');
      return;
    }

    try {
      logger.info(`Attempting to assert queue: ${queue}`);
      await this.channel.assertQueue(queue, { durable: true });
      logger.info(`Queue ${queue} asserted`);

      logger.info(`Attempting to consume messages from queue: ${queue}`);
      this.channel.consume(queue, (msg: any) => {
        if (msg !== null) {
          logger.info(`Message received: ${msg.content.toString()}`);
          this.channel.ack(msg);
        } else {
          logger.warn('Received null message');
        }
      });
    } catch (error) {
      logger.error('Failed to consume message:', this.formatError(error));
    }
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return JSON.stringify(error);
  }
}
