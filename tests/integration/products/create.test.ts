import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('Integração - Produtos - POST.', function () { 
  beforeEach(function () { sinon.restore(); });

  it('create: Retorna um novo produto e o status 201', async function() {
    const productToCreate = {
      name: 'Product w1', price: '1000', orderId: 1 
    };
    
    ProductModel.create = sinon.stub().returns({dataValues:{...productToCreate, id: 1}});

    const res = await chai.request(app).post('/products').send(productToCreate);
    expect(res.status).to.be.equal(201);
    expect(res.body.name).to.be.equal(productToCreate.name);
    expect(res.body.price).to.be.equal(productToCreate.price);
    expect(res.body).to.haveOwnProperty('id');
  });

  it('create: Retorna uma mensagem de erro com status 422 caso o name seja menor que 3.', async function() {
    const productToCreate = {
      name: 'Pr', price: '1000', orderId: 1 
    };
    
    ProductModel.create = sinon.stub().returns({dataValues:{...productToCreate, id: 1}});

    const res = await chai.request(app).post('/products').send(productToCreate);
    expect(res.status).to.be.equal(422);
    expect(res.body.message).to.be.equal('"name" length must be at least 3 characters long');
  });

  // it('create: Retorna uma mensagem de erro com status 422 caso o price seja menor que 3.', async function() {
  //   const productToCreate = {
  //     name: 'Produto', price: '12', orderId: 1 
  //   };
    
  //   ProductModel.create = sinon.stub().returns({dataValues:{...productToCreate, id: 1}});

  //   const res = await chai.request(app).post('/products').send(productToCreate);
  //   expect(res.status).to.be.equal(422);
  //   expect(res.body.message).to.be.equal('"price" length must be at least 3 characters long');
  // });

  it('create: Retorna uma mensagem de erro com status 422 caso o name não seja uma string.', async function() {
    const productToCreate = {
      name: 4, price: '1000', orderId: 1 
    };
    
    ProductModel.create = sinon.stub().returns({dataValues:{...productToCreate, id: 1}});

    const res = await chai.request(app).post('/products').send(productToCreate);
    expect(res.status).to.be.equal(422);
    expect(res.body.message).to.be.equal('"name" must be a string');
  });

  // it('create: Retorna uma mensagem de erro com status 422 caso o price não seja uma string.', async function() {
  //   const productToCreate = {
  //     name: 'ddd', price: 1000, orderId: 1 
  //   };
    
  //   ProductModel.create = sinon.stub().returns({dataValues:{...productToCreate, id: 1}});

  //   const res = await chai.request(app).post('/products').send(productToCreate);
  //   expect(res.status).to.be.equal(422);
  //   expect(res.body.message).to.be.equal('"price" must be a string');
  // });
});
