import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order } from '../types/Order'; 
 
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

export default {
  getAllOrdersWithProductIds,
};