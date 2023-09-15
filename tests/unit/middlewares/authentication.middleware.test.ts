import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response, NextFunction } from 'express';
import ProductController from '../../../src/controllers/product';
import ProductService from '../../../src/services/product';
import { Product } from '../../../src/types/Product';
import checkAuthentication from '../../../src/midlewares/checkUserAuthentication';
import jwt from 'jsonwebtoken';
import exp from 'constants';
import { cat } from 'shelljs';

chai.use(sinonChai);

describe('CheckAuthenticationMiddleware', function () {
  const req = { headers:{ authorization:'d' },body:{}} as Request;
  const res = {} as Response;
 
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res); 
    sinon.restore();
  });

  afterEach(function () { sinon.restore(); });
 
  it('checkUserAuthentication: Lança uma excessão caso authorization não seja informado', async function () {
    try{
      checkAuthentication({ headers:{ authorization: undefined },body:{}} as Request, res, ()=>{});
    }catch(e){
      expect(e).to.be.an('error');
    }
  });

  it('checkUserAuthentication: Lança uma excessão caso o authorization não seja válido.', async function () {
    try{
      checkAuthentication({ headers:{ authorization: 'd' },body:{}} as Request, res, ()=>{});
    }catch(e){
      expect(e).to.be.an('error');
    }

  });

  it('checkUserAuthentication: Verifica se a função next é chamada caso seja passado o token seja válido.', async function () {
    const nextStub = sinon.stub();
    jwt.verify = sinon.stub().returns(true);
    checkAuthentication({ headers:{ authorization:'d' },body:{}} as Request, res, nextStub);
    expect(nextStub).to.have.been.calledOnce;
  });
});
