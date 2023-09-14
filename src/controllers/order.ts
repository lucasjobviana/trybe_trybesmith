import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order';

const getAllOrdersWithProductIds = async (req: Request, res: Response, _next: NextFunction) => {
  const orders = await OrderService.getAllOrdersWithProductIds();
  res.status(200).json(orders);
};

// const createProduct = async (req: Request, res: Response, _next: NextFunction) => {
//   const { name, orderId, price } = req.body;
//   const newProduct = await OrderService.createProduct({ name, orderId, price });
//   res.status(201).json({ id: newProduct.id, name: newProduct.name, price: newProduct.price });
// };

export default {
  getAllOrdersWithProductIds,
};