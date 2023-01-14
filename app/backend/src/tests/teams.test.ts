import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/TeamModel';
import { allTeams } from './mock/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste da rota de Teams', () => {
  describe('Teste da rota GET /teams ', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves( allTeams as Team[]);
    });

    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })

    it('Se retorna todos os times corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(allTeams);
      expect(chaiHttpResponse.body).to.have.lengthOf(16);
    });
  })
  describe('Teste da rota GET /teams:id ', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Team, "findOne")
        .resolves(allTeams[0] as Team);
    });

    afterEach(() => {
      (Team.findOne as sinon.SinonStub).restore();
    })

    it('Se retorna todos os times corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(allTeams[0]);
      expect(chaiHttpResponse.body).to.have.lengthOf(1);
    });
  })
});
