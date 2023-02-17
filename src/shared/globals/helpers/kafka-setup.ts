import { Kafka } from 'kafkajs';
import Logger from 'bunyan';
import { config } from '@root/config';

const SERVER_PORT = 4000;
const log: Logger = config.createLogger('kafka-server');

class KafkaServer {
  private kafka: Kafka | null = null;

  constructor() {
    this.setUpKafka();
  }

  private setUpKafka() {
    this.kafka = new Kafka({
      clientId: 'movie-app',
      brokers: ['kafka1:9092', 'kafka2:9092']
    });
  }

  private async sendMessages(message: Record<string, string>): Promise<void> {
    const producer = this.kafka!.producer();
    try {
      await producer.connect();
      await producer.send({
        topic: 'ratings-topic',
        messages: [{ value: JSON.stringify(message) }]
      });
      log.info(`Message sent to Kafka: ${JSON.stringify(message)}`);
    } catch (error) {
      log.error('Failed to send messages:', error);
    } finally {
      await producer.disconnect();
    }
  }
}

export const kafkaServer: KafkaServer = new KafkaServer();
