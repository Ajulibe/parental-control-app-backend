import Logger from 'bunyan';
import { config } from '@root/config';
import mongoose from 'mongoose';

const log: Logger = config.createLogger('setupMongoose');

export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        log.info('Successfully connected to Mongo database.');
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
