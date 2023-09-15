import bcrypt from 'bcryptjs';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('Integração - Login - POST', function () { 
  beforeEach(function () { sinon.restore(); });

  // it('login: Retorna uma mensagem de erro e o status 400 caso o username e o password não sejam informados.', async function() {
  //   const orders = [
  //      { id: 1, userId: 1, productIds: [11, 22] },
  //     { id: 2, userId: 3, productIds: [1, 2] },
  //   ];
     
  //   const res = await chai.request(app).post('/login');
  //   expect(res.status).to.be.equal(400);
  // });

  it('login: Retorna um novo token e o status 200 o input seja válido.', async function() {
    bcrypt.compareSync = sinon.stub().returns(true);
    UserModel.findOne = sinon.stub().returns({dataValues: {password: 'admin'}});
     
    const res = await chai.request(app).post('/login')
    .send({ username: 'admin', password: 'admin' })
    expect(res.status).to.be.equal(200);
  });
});
