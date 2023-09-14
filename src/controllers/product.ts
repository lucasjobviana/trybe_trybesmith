import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/product';

const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const products = await ProductService.getAllProducts();
  res.status(200).json(products);
};

const createProduct = async (req: Request, res: Response, _: NextFunction) => {
  const { name, orderId, price } = req.body;
  const newProduct = await ProductService.createProduct({ name, orderId, price });
  res.status(201).json({ id: newProduct.id, name: newProduct.name, price: newProduct.price });
};

export default {
  getAllProducts,
  createProduct,
};