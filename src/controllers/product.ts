import { NextFunction, Request, Response } from 'express';
import ProductService from '../services/product';

const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  const products = await ProductService.getAllProducts();
  res.status(200).json(products);
};

const createProduct = async (req: Request, res: Response, _next: NextFunction) => {
  const { name, orderId, price } = req.body;
  await ProductService.createProduct({ name, orderId, price });
  res.status(201).json({ message: `Product created successfully ${name} ${orderId} ${price}` });
};

export default {
  getAllProducts,
  createProduct,
};