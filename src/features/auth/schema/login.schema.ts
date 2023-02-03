import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
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
  })
});

export { loginSchema };
