import supertest from 'supertest';
import app from '../index.js';
import testUser from './testUser.js';
import { expect } from 'chai';

describe('POST /refreshToken', () => {
  it('Should return status missing token', async () => {
    const resp = await supertest(app).post('/auth/refreshToken').expect(401);

    expect(resp.body.message.toLowerCase()).to.equal('missing refresh token');
  });

  let refreshToken = null;

  before(async () => {
    await supertest(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .then((resp) => {
        refreshToken = resp.body.refreshToken;
      });
  });

  it('Should return a new refresh token', async () => {
    const resp = await supertest(app)
      .post('/auth/refreshToken')
      .send({
        refreshToken: refreshToken,
      })
      .expect(200);

    expect(resp.body.refreshToken).to.not.equal(refreshToken);
  });

  after(async () => {
    await supertest(app)
    .post('/auth/logOff')
    .send({
      refreshToken: refreshToken
    })
  })
});
