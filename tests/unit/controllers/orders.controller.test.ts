import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { Order } from '../../../src/types/Order';
import OrderService from '../../../src/services/order';
import OrderController from '../../../src/controllers/order';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(function () {
    sinon.restore();
  });

  type OrderWithProductIds = Order & { productIds: number[] };
  type NewOrderWithProductIds = { productIds: number[], userId: number };
 
  it('getAllOrdersWithProductIds: Retorna um array de vendas, com seus productIds, e o status 200.', async function () {
    const order: OrderWithProductIds[] = [
      { id:1,  userId: 1, productIds: [1,2]},
      { id:2,  userId: 1, productIds: [11,21,61]},
    ]; 
    
    OrderService.getAllOrdersWithProductIds = sinon.stub().returns(order);

    await OrderController.getAllOrdersWithProductIds(req, res, () => {});

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(order);
  });

  it('createOrder: Retorna uma nova venda e o status 201.', async function () {
    const order: NewOrderWithProductIds = 
      { userId: 1, productIds: [1,2]}
    ; 

    const reqWithOrder = {
      body: {
        userId: 1,
        productIds: [1,2],
      },
    } as Request;

    
    OrderService.createOrder = sinon.stub().returns(order);

    await OrderController.createOrder(reqWithOrder, res, () => {});

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(order);
  });

  it('createOrder: Retorna undefined caso não seja possível criar a nova venda.', async function () {
    const order: NewOrderWithProductIds = 
      { userId: 1, productIds: [1,2]}
    ; 

    const reqWithOrder = {
      body: {
        userId: 1,
        productIds: [1,2],
      },
    } as Request;

    
    OrderService.createOrder = sinon.stub().returns(false);

    const functionReturn = await OrderController.createOrder(reqWithOrder, res, () => {});
    expect(functionReturn).to.be.undefined;
  });
});
