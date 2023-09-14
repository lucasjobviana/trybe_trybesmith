import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('Integração: Produtos.', function () { 
  beforeEach(function () { sinon.restore(); });
  it('create: Retorna um novo produto e o status 201', async function() {
    const productToCreate = {
       name: 'Product 11', price: '100', orderId: 1 
    };

    const res = await chai.request(app).post('/products').send(productToCreate);
    expect(res.status).to.be.equal(201);
    expect(res.body.name).to.be.equal(productToCreate.name);
    expect(res.body.price).to.be.equal(productToCreate.price);
    expect(res.body).to.haveOwnProperty('id');
  });
});
