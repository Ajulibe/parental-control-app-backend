import Joi, { ObjectSchema } from 'joi';

const appSchema: ObjectSchema = Joi.object().keys({
  device_id: Joi.string().required().min(5).messages({
    'string.base': 'deviceId must be of type string',
    'string.min': 'Invalid deviceId',
    'string.empty': 'deviceId is a required field'
  }),
  installed_app_name: Joi.string().required().messages({
    'string.base': 'installedAppName must be of type string',
    'string.empty': 'installedAppName is a required field'
  }),
  app_status: Joi.string().valid('active', 'inactive').required().messages({
    'string.base': 'appStatus must be of type string',
    'string.empty': 'appStatus is a required field',
    'any.only': 'appStatus can only be "active" or "inactive"'
  })
});

export { appSchema };
