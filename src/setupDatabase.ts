import Logger from 'bunyan';
import { config } from '@root/config';
import { redisConnection } from '@service/redis/redis.connection';
import { Sequelize } from 'sequelize-typescript';
import { AuthorisedParent } from '@authparents/models/auth.model';
import { Apps as AppsModel } from '@apps/model/apps.model';
import { Location as LocationModel } from '@root/features/location/model/location.model';
import { Children as ChildrenModel } from '@children/model/children.model';

const log: Logger = config.createLogger('setupDatabase');

let connection: Sequelize;

export default () => {
  // connection = new Sequelize({
  //   dialect: 'postgres',
  //   host: 'localhost',
  //   username: 'postgres',
  //   password: 'postgres',
  //   database: 'action_learning',
  //   logging: false,
  //   models: [AuthorisedParent, AppsModel, LocationModel, ChildrenModel]
  // });

  connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
    models: [AuthorisedParent, AppsModel, LocationModel, ChildrenModel]
  });

  const connect = async () => {
    try {
      await connection.sync();
      // redisConnection.connect();
      log.info('Connection has been established successfully.');
    } catch (error) {
      log.error('Unable to connect to the database:', error);
    }
  };
  connect();
};
export { connection };
