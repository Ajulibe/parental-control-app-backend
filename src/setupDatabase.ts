import { Apps as AppsModel } from '@root/features/previous/apps/model/apps.model';
import { AuthorisedParent } from '@root/features/previous/auth/models/auth.model';
import { Children as ChildrenModel } from '@root/features/previous/children/model/children.model';
import { Location as LocationModel } from '@root/features/previous/location/model/location.model';
import Logger from 'bunyan';
import { Sequelize } from 'sequelize-typescript';
import { config } from '@root/config';

const log: Logger = config.createLogger('setupDatabase');

let connection: Sequelize;

export default () => {
  connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'action_learning',
    logging: false,
    models: [AuthorisedParent, AppsModel, LocationModel, ChildrenModel]
  });

  // connection = new Sequelize({
  //   dialect: 'postgres',
  //   host: process.env.PGHOST,
  //   username: process.env.PGUSER,
  //   password: process.env.PGPASSWORD,
  //   database: process.env.PGDATABASE,
  //   logging: false,
  //   models: [AuthorisedParent, AppsModel, LocationModel, ChildrenModel]
  // });

  const connect = async () => {
    try {
      await connection.sync();
      log.info('Connection to POSTGRESQL has been established successfully.');
    } catch (error) {
      log.error('Unable to connect to the database:', error);
    }
  };
  connect();
};
export { connection };
