import { NextFunction, Request, Response } from 'express';
import OrderService from '../services/order';

const getAllOrdersWithProductIds = async (req: Request, res: Response, _next: NextFunction) => {
  const orders = await OrderService.getAllOrdersWithProductIds();
  res.status(200).json(orders);
};

export default {
  getAllOrdersWithProductIds, 
};