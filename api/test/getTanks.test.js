import supertest from 'supertest';
import app from '../index.js';
import testUser from './testUser.js';
import { expect } from 'chai';

describe('GET /tanks/', () => {
  it('Should return status 401', async () => {
    await supertest(app).get('/tanks').expect(401);
  });

  let token = null;
  let refreshToken = null;

  before(async () => {
    await supertest(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .then((resp) => {
        token = resp.body.token,
        refreshToken = resp.body.refreshToken
      });
  });

  it('Should return status 200 and an array', async () => {
    const resp = await supertest(app)
      .get('/tanks')
      .set({ 'x-access-token': token })
      .expect(200);

    expect(resp.body.data).to.be.an('Array').and.have.lengthOf.above(0);
  });

  after(async () => {
    await supertest(app).post('/auth/logOff').send({
      refreshToken: refreshToken,
    });
  });
});
