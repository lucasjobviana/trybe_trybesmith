import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response, NextFunction } from 'express';
import ProductController from '../../../src/controllers/product';
import ProductService from '../../../src/services/product';
import { Product } from '../../../src/types/Product';
import v from '../../../src/midlewares/validateLoginInput';
import exp from 'constants';

chai.use(sinonChai);

describe('LoginMiddleware', function () {
  const req = { body:{}} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res); 
    sinon.restore();
  });

  afterEach(function () { sinon.restore(); });

  it('loginInput: Retorna uma mensagemm de erro com status 400 caso username não seja informado.', async function () {
    v.validateLoginInput({body:{username:"d"}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(400)
  });

  it('loginInput: Retorna uma mensagemm de erro com status 400 caso password não seja informado.', async function () {
    v.validateLoginInput({body:{password:"d"}}as Request, res, ()=>{});
    expect(res.status).to.have.been.calledWith(400);
  });


  it('loginInput: Verifica se a função next é chamada caso seja passado password e username.', async function () {
    const nextStub = sinon.stub();
    v.validateLoginInput({body:{password:"d", username:"d" }}as Request, res, nextStub);
    expect(nextStub).to.have.been.calledOnce;
  });
});
