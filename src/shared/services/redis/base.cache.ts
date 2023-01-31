import { createClient } from 'redis';
import Logger from 'bunyan';
import { config } from '@root/config';

export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
  client: RedisClient;
  log: Logger;

  constructor(cacheName: string) {
    // this.client = createClient({ url: `redis://${config.REDIS_HOST}` });
    //read redis docs here: https://github.com/redis/node-redis
    //for local redis connection. Production redis connection is different
    this.client = createClient();
    this.log = config.createLogger(cacheName);
    this.cacheError();
  }

  private cacheError(): void {
    this.client.on('error', (error: unknown) => {
      this.log.error(error);
    });
  }
}
