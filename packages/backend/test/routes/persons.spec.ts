import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import start from '../../src/start';

chai.use(chaiHttp);

describe('/persons', () => {
  it('[200] GET "/persons"', async () => {
    const res = await chai.request(start).get('/persons');
    expect(res.body.message).to.be.undefined;
    expect(res.status).to.be.equal(200);
  });
});

describe('/persons/:personId<integer>', () => {
  it('[400] GET "/persons/x" - "x" is not a integer', async () => {
    const res = await chai.request(start).get('/persons/x');
    expect(res.status).to.eql(400);
    expect(res.body.message).to.eql('request/params/personId must be integer');
  });
});

describe('/persons/-9999', () => {
  it('[404] GET "/persons/-9999" - not found', async () => {
    const res = await chai.request(start).get('/persons/-9999');
    expect(res.status).to.eql(404);
  });
});

describe('/persons', () => {
  it('[201] POST "/persons" - creates a new person', async () => {
    const res = await chai.request(start)
      .post('/persons')
      .send({
        firstName: 'Testy',
        lastName: 'Von Test',
        email: 'TestyVonTest@foomail.bar'
      });
    expect(res.body.message).to.be.undefined;
    expect(res.status).to.eql(201);
  });
  it('[201] POST "/persons" - creates a new person with custom avatar', async () => {
    const res = await chai.request(start)
      .post('/persons')
      .send({
        firstName: 'Testy',
        lastName: 'Von Test',
        email: 'TestyVonTest@foomail.bar',
        avatar: 'https://robohash.org/mycustomavatar'
      });
    expect(res.body.message).to.be.undefined;
    expect(res.status).to.eql(201);
  });
  it('[201] POST "/persons" - creates a new person with address', async () => {
    const res = await chai.request(start)
      .post('/persons')
      .send({
        firstName: 'Testy',
        lastName: 'Von Test',
        email: 'TestyVonTest@foomail.bar',
        address: {
          streetAddress: 'testy street address',
          zipCode: '1234',
          city: 'testy city',
          country: 'testy country'
        },
      });
    expect(res.body.message).to.be.undefined;
    expect(res.status).to.eql(201);
  });
});
