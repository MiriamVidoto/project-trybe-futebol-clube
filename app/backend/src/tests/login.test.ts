import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste da rota de Login', () => {
  describe('Teste da rota POST /login', () => {
    it('Se é possível fazer o login com sucesso e retornar um token', async () => {
      const body = { email: "admin@admin.com", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token');
    });
    it('Se não é possível fazer o login sem informar o email', async () => {
      const body = { email: "", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal({ message: 'All fields must be filled' });
    });
    it('Se não é possível fazer o login sem informar a senha', async () => {
      const body = { email: "admin@admin.com", password: "" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal({ message: 'All fields must be filled' });
    });
    it('Se não é possível fazer o login com um email inválido', async () => {
      const body = { email: "invalidemail", password: "secret_admin" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal({ message: 'Incorrect email or password' });
    });
    it('Se não é possível fazer o login com uma senha inválida', async () => {
      const body = { email: "admin@admin.com", password: "123456789" };
      const response = await chai.request(app).post('/login').send(body);
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal({ message: 'Incorrect email or password' });
    });
  });
  describe('Teste da rota GET /login', () => {
    it('Se retorna os dados corretos', async () => {
      const body = { email: "admin@admin.com", password: "secret_admin" };
      const login = await chai.request(app).post('/login').send(body);
      const response = await chai.request(app).get('/login/validate').set('authorization', login.body.token)
      expect(response.status).to.be.equal(200);
      expect(response.body.role).to.be.equal('admin');
    })
  });
});