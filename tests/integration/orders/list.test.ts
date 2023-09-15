import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http'; 
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('Integração - Vendas - GET', function () { 
  beforeEach(function () { sinon.restore(); });

  it('getAllOrdersWithProductIds: Retorna uma lista com todas as vendas, incluindo seus productIds, e o status 200', async function() {
    const orders = [
      { id: 1, userId: 1, productIds: [11, 22] },
      { id: 2, userId: 3, productIds: [1, 2] },
    ];
    
    OrderModel.findAll = sinon.stub().returns([{dataValues:{ id: 1, userId: 1 }}, {dataValues:{ id: 2, userId: 3 }}]);
    ProductModel.findAll = sinon.stub().returns([
      {dataValues: { id: 11, name: 'Product w1', price: '1000', orderId: 1 }},
      {dataValues: { id: 22, name: 'Product w2', price: '2000', orderId: 1 }},
      {dataValues: { id: 1, name: 'Product w1', price: '1000', orderId: 2 }},
      {dataValues: { id: 2, name: 'Product w2', price: '2000', orderId: 2 }},
    ]);

    const res = await chai.request(app).get('/orders');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(orders);
  });
});
 