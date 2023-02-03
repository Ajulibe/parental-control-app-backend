import Joi, { ObjectSchema } from 'joi';

const registerSchema: ObjectSchema = Joi.object().keys({
  email_address: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is a required field'
  }),
  password: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  child_name: Joi.string().required().min(4).messages({
    'string.base': 'Child Name must be of type string',
    'string.min': 'Invalid child Name',
    'string.empty': 'Child name is a required field'
  }),
  device_id: Joi.string().required().min(5).messages({
    'string.base': 'deviceId must be of type string',
    'string.min': 'Invalid deviceId',
    'string.empty': 'deviceId is a required field'
  })
});

export { registerSchema };
