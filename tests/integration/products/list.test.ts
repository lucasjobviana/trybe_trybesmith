import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http'; 
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('Integração - Produtos - GET', function () { 
  beforeEach(function () { sinon.restore(); });

  it('getAllProducts: Retorna uma lista com todos os produtos e o status 200', async function() {
    const responseModel = [
      {dataValues: { id: 1, name: 'Product w1', price: '1000', orderId: 1 }},
      {dataValues: { id: 2, name: 'Product w2', price: '2000', orderId: 1 }},
    ];

    const products = [
      { id: 1, name: 'Product w1', price: '1000', orderId: 1 },
      { id: 2, name: 'Product w2', price: '2000', orderId: 1 },
    ];
    
    ProductModel.findAll = sinon.stub().returns(responseModel);

    const res = await chai.request(app).get('/products');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(products);
  });

});
