import { OrderInputtableTypes } from '../../../database/models/order.model';
import { arrayOfCreateOrderSchema } from '../schemas/createOrder.schema';
import ServiceError from '../../serviceError';

const createOrderValidator = (order:OrderInputtableTypes[]): void => {
  const { error } = arrayOfCreateOrderSchema.validate(order);
  if (error) throw new ServiceError(error.message.replace('[0].', ''), 422);
};

export = createOrderValidator;