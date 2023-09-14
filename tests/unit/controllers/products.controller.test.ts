import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductController from '../../../src/controllers/product';
import ProductService from '../../../src/services/product';
import { Product } from '../../../src/types/Product';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res); 
    sinon.restore();
  });

  afterEach(function () { sinon.restore(); });

  it('getAllProducts: Retorna um array de produtos com o status 200.', async function () {
    const products: Product[] = [
      { id: 1, name: 'Product 1', price: '100' , orderId: 1},
      { id: 2, name: 'Product 2', price: '200' , orderId: 2},
    ]; 
    ProductService.getAllProducts = sinon.stub().returns(products);

    await ProductController.getAllProducts(req, res, ()=>{});

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('createProduct: Retorna um novo produto com status 201.', async function () {
    const newExpectedProduct = { 
      id: 11, name: 'Product 11', price: '100' 
    }; 

    const reqWithProductToCreate = {
      body:{
        name: 'Product 11', price: '100', orderId: 1
      }
    } as Request;

    ProductService.createProduct = sinon.stub().returns(newExpectedProduct);

    await ProductController.createProduct(reqWithProductToCreate, res, ()=>{});

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newExpectedProduct);
  });

});
