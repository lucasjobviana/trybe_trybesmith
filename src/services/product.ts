import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

const getAllProducts = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();
  return products.map((product) => product.dataValues);
};

const createProduct = async (product: ProductInputtableTypes): Promise<Product> => {
  const newProduct = await ProductModel.create(product);
  return newProduct.dataValues;
};

export default {
  getAllProducts,
  createProduct,
};