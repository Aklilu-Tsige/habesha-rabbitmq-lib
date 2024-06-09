import dotenv from 'dotenv';

dotenv.config();

class Config {
  public readonly rabbitmqUrl: string;
  public readonly port: number;
  public readonly queueName: string;

  constructor() {
    this.rabbitmqUrl = process.env.RABBITMQ_URL || '';
    this.port = Number(process.env.PORT) || 3000;
    this.queueName = process.env.QUEUE_NAME || 'default-queue';
  }
}

const config = new Config();
export default config;
