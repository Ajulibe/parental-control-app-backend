import Joi, { ObjectSchema } from 'joi';

const ratingSchema: ObjectSchema = Joi.object().keys({
  user_id: Joi.number().integer().positive().required().messages({
    'number.base': 'User ID must be of type number',
    'number.integer': 'User ID must be an integer',
    'number.positive': 'User ID must be a positive integer',
    'number.empty': 'User ID is a required field'
  }),
  movie_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Movie ID must be of type number',
    'number.integer': 'Movie ID must be an integer',
    'number.positive': 'Movie ID must be a positive integer',
    'number.empty': 'Movie ID is a required field'
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    'number.base': 'Rating must be of type number',
    'number.integer': 'Rating must be an integer',
    'number.min': 'Rating must be between 1 and 5',
    'number.max': 'Rating must be between 1 and 5',
    'number.empty': 'Rating is a required field'
  })
});

export { ratingSchema };
