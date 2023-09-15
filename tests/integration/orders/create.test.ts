import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);

describe('Integração - Order - POST', function () { 
  beforeEach(function () { sinon.restore(); });

  it('create: Retorna uma nova venda e o status 201', async function() {
    const orderToCreate = {
      productIds:[1,2], userId: 1 
    };
    
    OrderModel.findOne = sinon.stub().returns(true);
    ProductModel.update = sinon.stub().returns(true);
    OrderModel.create = sinon.stub().returns({dataValues:{ id: 1, userId:orderToCreate.userId }});
    jwt.verify = sinon.stub().returns(true);
    

    const res = await chai.request(app).post('/orders').send(orderToCreate).set('authorization', 'asdf'); 
    expect(res.status).to.be.equal(201);
    // expect(res.body).to.be.equal(orderToCreate);
    
  });

  // it('create: Retorna uma mensagem de erro com status 422 caso o name seja menor que 3.', async function() {
  //   const productToCreate = {
  //     name: 'Pr', price: '1000', orderId: 1 
  //   };
    
  //   ProductModel.create = sinon.stub().returns({dataValues:{...productToCreate, id: 1}});

  //   const res = await chai.request(app).post('/products').send(productToCreate);
  //   expect(res.status).to.be.equal(422);
  //   expect(res.body.message).to.be.equal('"name" length must be at least 3 characters long');
  // });
});
