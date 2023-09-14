import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.string().min(3).max(30).required(),
  orderId: Joi.number().integer().min(1).required(),
});

export = createProductSchema;