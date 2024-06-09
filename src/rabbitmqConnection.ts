import amqp from 'amqplib';
import config from './config';
import logger from './utils/logger';

export class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection: amqp.Connection | undefined;
  private channel: amqp.Channel | undefined;
  private connectPromise: Promise<void>;

  private constructor() {
    this.connectPromise = this.connect();
  }

  public static getInstance(): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection();
    }
    return RabbitMQConnection.instance;
  }

  private async connect(): Promise<void> {
    try {
      logger.info('Attempting to connect to RabbitMQ');
      this.connection = await amqp.connect(config.rabbitmqUrl);
      logger.info('RabbitMQ connection established');
      this.channel = await this.connection.createChannel();
      logger.info('RabbitMQ channel created');
    } catch (error) {
      logger.error('Failed to connect to RabbitMQ:', this.formatError(error));
      throw error;
    }
  }

  public async getChannel(): Promise<amqp.Channel> {
    await this.connectPromise;
    if (!this.channel) {
      const errorMsg = 'Channel is not created. Call connect() first.';
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    return this.channel;
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return JSON.stringify(error);
  }
}
