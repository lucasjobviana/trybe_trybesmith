import { expect } from 'chai';
import sinon from 'sinon';
import { Order } from '../../../src/types/Order';
import OrderService from '../../../src/services/order';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  afterEach(function () { sinon.restore(); });

  type OrderWithProductIds = Order & { productIds: number[] };

  it('getAllOrdersWithProductIds: Retorna um array de vendas, com seus productIds, e o status 200.', async function () {
    const order: OrderWithProductIds[] = [
      { id:1,  userId: 1, productIds: [1,2]},
      { id:2,  userId: 1, productIds: [11,21,61]},
    ]; 
    
    const modelResponse  = [{ 
      dataValues: order[0],
    }
    ,{
      dataValues: order[1],
    }];
    

    OrderModel.findAll = sinon.stub().returns(modelResponse);
    ProductModel.findAll = sinon.stub().returns([{ dataValues: { id: 1, orderId: 1 } }, { dataValues: { id: 2, orderId: 1 } },
    { dataValues: { id: 11, orderId: 2 } }, { dataValues: { id: 21, orderId: 2 } }, { dataValues: { id: 61, orderId: 2 } }
    ]);

    const orderResponse = await OrderService.getAllOrdersWithProductIds(); 
    expect(orderResponse).to.be.deep.equal(order);
  });
});
