import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ProductController from '../../../src/controllers/product';
import ProductService from '../../../src/services/product';
import { Product } from '../../../src/types/Product';
import v from '../../../src/midlewares/validateCreateOrderInput';

chai.use(sinonChai);

describe('OrdersMiddleware', function () {
  const req = { body:{}} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns(res); 
    sinon.restore();
  });

  afterEach(function () { sinon.restore(); });

  it('createorderInput: Retorna uma mensagem de erro com status 400 caso productIds não seja informado.', async function () {
    v.validateCreateOrderInput({body:{userId:"d"}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(400)
  }); 

  it('createProductInput: Retorna uma mensagem de erro com status 400 caso userId não seja informado.', async function () {
    v.validateCreateOrderInput({body:{productIds:[0]}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(400)
  });

  it('createProductInput: Retorna uma mensagem de erro com status 422 caso productIds não seja um array .', async function () {
    v.validateCreateOrderInput({body:{userId:"d",productIds:true}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(422)
  });

  it('createProductInput: Retorna uma mensagem de erro com status 422 caso productIds seja um array vazio.', async function () {
    v.validateCreateOrderInput({body:{userId:"d",productIds:[]}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(422)
  });

  it('createProductInput: Verifica se a função next é chamada caso o input seja valido.', async function () {
    const nextStub = sinon.stub();
    v.validateCreateOrderInput({body:{userId:"d", productIds:[0] }}as Request, res, nextStub);
    expect(nextStub).to.have.been.calledOnce;
  });
});
