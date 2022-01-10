import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import start from '../src/start';

chai.use(chaiHttp);

describe('loads application', function () {
  it('[404] on get "/"', async () => {
    const res = await chai.request(start).get('/');
    expect(res.status).to.eql(404);
  });
});
