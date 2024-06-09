import express from 'express';
import config from './config';
import logger from './utils/logger';
import messageRoutes from './routes/messageRoutes';

const app = express();
app.use(express.json());

app.use('/api', messageRoutes);

app.listen(config.port, () => {
  logger.info(`Server started on port ${config.port}`);
});

console.log('Server is running...');

// Exporting necessary modules for reuse in other microservices
export { default as config } from './config';
export { ConsumerService as Consumer } from './consumer/consumerService';
export { ProducerService as Producer } from './producer/producerService';
export { RabbitMQConnection } from './rabbitmqConnection';
