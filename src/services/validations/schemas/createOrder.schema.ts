import Joi from 'joi';

export const createOrderSchema = Joi.object({
  userId: Joi.number().strict().integer().min(1).required(), 
  productId: Joi.number().integer().min(1).required(), 
});

export const arrayOfCreateOrderSchema = Joi.array().items(createOrderSchema).min(1);
