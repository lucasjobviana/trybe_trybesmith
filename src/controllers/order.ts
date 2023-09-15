import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order';

const getAllOrdersWithProductIds = async (req: Request, res: Response, _next: NextFunction) => {
  const orders = await OrderService.getAllOrdersWithProductIds();
  return res.status(200).json(orders);
}; 

const createOrder = async (req: Request, res: Response, _next: NextFunction) => {
  const { productIds, userId } = req.body;
  const { user, ...rest } = req.body;
  const arrayOfNewOrders = productIds.map((o:number) => ({ productId: o, userId }));
  const order = await OrderService.createOrder(arrayOfNewOrders);
  if (order) return res.status(201).json({ ...rest });
};

export default {
  getAllOrdersWithProductIds, 
  createOrder,
};