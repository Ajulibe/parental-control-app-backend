import Logger from 'bunyan';
import { config } from '@root/config';
import { redisConnection } from '@service/redis/redis.connection';
import { Sequelize } from 'sequelize-typescript';
import { AuthorisedParent } from '@authparents/models/auth.model';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'action_learning',
    logging: false,
    models: [AuthorisedParent]
  });

  const connect = async () => {
    try {
      await connection.sync();
      redisConnection.connect();
      log.info('Connection has been established successfully.');
    } catch (error) {
      log.error('Unable to connect to the database:', error);
    }
  };
  connect();
};
