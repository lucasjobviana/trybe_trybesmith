import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UserService from '../../../src/services/user';
import UserController from '../../../src/controllers/user';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  afterEach(function () { sinon.restore(); });


  it('login: Retorna um objeto com um token e o status 200 em caso de sucesso.', async function () {
    const response = { status:200, token: '1234567890' }; 
    const req = {
      body: {
        username: 'teste',
        password: 'teste',
      },
    } as Request;

    UserService.login = sinon.stub().returns(response);

    const resposta = await UserController.login(req, res, ()=>{});

    expect(res.status).to.have.been.calledWith(200);
  });

  it('login: Retorna um objeto com uma mensagem de erro e o status 401 em caso de falha.', async function () {
    const response = { status:401, message: 'Username or password invalid' }; 
    const req = {
      body: {
        username: 'teste',
        password: 'teste',
      },
    } as Request;

    UserService.login = sinon.stub().returns(response);

    const resposta = await UserController.login(req, res, ()=>{});

    expect(res.status).to.have.been.calledWith(401);
  });

});
