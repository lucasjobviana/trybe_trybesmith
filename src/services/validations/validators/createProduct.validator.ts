import { ProductInputtableTypes } from '../../../database/models/product.model';
import createProductSchema from '../schemas/createProduct.schema';
import ServiceError from '../../serviceError';

const createProductValidator = (product:ProductInputtableTypes): void => {
  const { error } = createProductSchema.validate(product);
  if (error) throw new ServiceError(error.message);
};

export = createProductValidator;