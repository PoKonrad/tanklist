import supertest from 'supertest';
import app from '../index.js';
import testUser from './testUser.js';
import { expect } from 'chai';

describe('GET /tank', () => {
  it('Should return status 401', async () => {
    await supertest(app).get('/tank').expect(401);
  });

  let token = null;

  before(async () => {
    await supertest(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .then((resp) => {
        token = resp.body.token;
      });
  });

  it('Should return status 200 and an array', async () => {
    const resp = await supertest(app)
      .get('/tank')
      .set({ 'x-access-token': token })
      .expect(200);

    expect(resp.body.data).to.be.an('Array').and.have.lengthOf.above(0);
  });
});
