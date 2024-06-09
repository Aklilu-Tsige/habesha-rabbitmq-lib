declare module 'rabbitmq-lib' {
    import { Channel } from 'amqplib';
  
    export interface Config {
      port: number;
      rabbitmqUrl: string;
      queueName: string;
    }
  
    export class RabbitMQConnection {
      static getInstance(): RabbitMQConnection;
      getChannel(): Promise<Channel>;
    }
  
    export class ProducerService {
      sendToQueue(message: string): Promise<void>;
    }
  
    export class ConsumerService {
      startConsuming(queue: string): Promise<void>;
    }
  
    export const config: Config;
    export { default as logger } from './utils/logger';
  }
  