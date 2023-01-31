import Joi, { ObjectSchema } from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envVarsSchema: ObjectSchema = Joi.object()
  .keys({
    DATABASE_URL: Joi.string().default('mongodb://localhost:27017/chattyapp-backend'),
    JWT_TOKEN: Joi.string().default('wfeefwffwef'),
    NODE_ENV: Joi.string().default('development'),
    SECRET_KEY_ONE: Joi.string().default('thisisasecretkeyone'),
    SECRET_KEY_TWO: Joi.string().default('thisisasecretkeyone'),
    CLIENT_URL: Joi.string().default('http://localhost:3000'),
    REDIS_HOST: Joi.string().default(),
    CLOUD_NAME: Joi.string().default('ajulibe'),
    CLOUD_API_KEY: Joi.string().default('731597918821489'),
    CLOUD_API_SECRET: Joi.string().default('AcXuOE_dzhkVt61C8nPXynivag4'),
    SENDER_EMAIL: Joi.string().default(),
    SENDER_EMAIL_PASSWORD: Joi.string().default(),
    SENDGRID_API_KEY: Joi.string().default(),
    SENDGRID_SENDER: Joi.string().default(),
    EC2_URL: Joi.string().default('http://169.254.169.254/latest/meta-data/instance-id')
  })
  .unknown();

export default envVarsSchema;
