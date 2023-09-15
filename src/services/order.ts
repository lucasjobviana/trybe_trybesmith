import { Sequelize } from 'sequelize';
import OrderModel, { OrderInputtableTypes } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Order } from '../types/Order'; 
import createOrderValidator from './validations/validators/createOrder.validator';
import config from '../database/config/database';
import ServiceError from './serviceError';

const sequelize = new Sequelize(config); 
 
const getAllOrdersWithProductIds = async (): Promise<Order[]> => {
  const orders = await OrderModel.findAll();
  const ordersDataValues = orders.map((order) => order.dataValues);
  const products = await ProductModel.findAll(
    {
      where: {
        orderId: ordersDataValues.map((order) => order.id),
      },
    },
  );
  const productsDataValues = products.map((product) => product.dataValues);
  const ordersWithProductIds = ordersDataValues.map((order) => ({
    ...order,
    productIds: productsDataValues.filter((product) => 
      product.orderId === order.id).map((product) => product.id),
  }));
  
  return ordersWithProductIds;
};

const createOrder = async (order: OrderInputtableTypes[]): Promise<boolean> => {
  createOrderValidator(order);
  const userId = await UserModel.findOne({ where: { id: order[0].userId },
  });
  if (!userId) { throw new ServiceError('"userId" not found'); }
  const t = await sequelize.transaction();
  try {
    const newOrder = await OrderModel.create({ userId: order[0].userId }, { transaction: t });
    const { id } = newOrder.dataValues;
    await ProductModel.update(
      { orderId: id }, 
      { where: { id: order[0].productId }, transaction: t },
    );
    await t.commit();
  } catch (error) {
    await t.rollback(); throw error;
  }
  return true;
};

export default {
  getAllOrdersWithProductIds,
  createOrder,
}; 
