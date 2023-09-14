import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductController from '../../../src/controllers/product';
import ProductService from '../../../src/services/product';
import { Product } from '../../../src/types/Product';
import v from '../../../src/midlewares/validateCreateProductInput';

chai.use(sinonChai);

describe('ProductsMiddleware', function () {
  const req = { body:{}} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res); 
    sinon.restore();
  });

  afterEach(function () { sinon.restore(); });

  it('createProductInput: Retorna uma mensagemm de erro com status 400 caso name não seja informado.', async function () {
    v.validateCreateProductInput({body:{price:"d"}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(400)
  });

  it('createProductInput: Retorna uma mensagemm de erro com status 400 caso price não seja informado.', async function () {
    v.validateCreateProductInput({body:{name:"d"}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(400)
  });
});
