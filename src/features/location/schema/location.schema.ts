import Joi, { ObjectSchema } from 'joi';

const locationSchema: ObjectSchema = Joi.object().keys({
  device_id: Joi.string().required().min(5).messages({
    'string.base': 'deviceId must be of type string',
    'string.min': 'Invalid deviceId',
    'string.empty': 'deviceId is a required field'
  }),
  latitude: Joi.number().required().messages({
    'number.base': 'Latitude must be of type number',
    'number.empty': 'Latitude is a required field'
  }),
  longitude: Joi.number().required().messages({
    'number.base': 'Longitude must be of type number',
    'number.empty': 'Longitude is a required field'
  })
});

export { locationSchema };
