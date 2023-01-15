import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { allTeams } from './mock/teams.mock';
import { allMatches } from './mock/matches.mock';
import { leardboardHome, leaderboardAway } from './mock/learderboard';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste da rota de Learderboard', () => {
  describe('Teste da rota GET /leaderboard/home ', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as Team[]);
      sinon
        .stub(Match, "findAll")
        .resolves(allMatches as any);
    });

    afterEach(()=>{
      (Team.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Se retorna as classificações dos times da casa corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(leardboardHome);
    });
  });

  describe('Teste da rota GET /leaderboard/home ', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(allTeams as Team[]);
      sinon
        .stub(Match, "findAll")
        .resolves(allMatches as any);
    });

    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Se retorna as classificações dos times da casa corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.equal(leaderboardAway);
    });
  })
});

