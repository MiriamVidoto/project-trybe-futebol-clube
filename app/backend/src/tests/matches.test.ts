import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/MatchModel';
import { allMatches, matchesInProgress, matchesFinished } from './mock/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste da rota de Matches', () => {
  describe('Teste da rota GET /matches ', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(allMatches as any);
    });

    afterEach(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Se retorna todas as partidas corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(allMatches);
    });
  })
  describe('Teste da rota GET /matches?inProgress=true', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchesInProgress as any);
    });

    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Se retorna todas as partidas em progresso corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(matchesInProgress);
    });
  })
  describe('Teste da rota GET /matches?inProgress=false', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(matchesFinished as any);
    });

    afterEach(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Se retorna todas as partidas finalizadas corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(matchesFinished);
    });
  })
});
