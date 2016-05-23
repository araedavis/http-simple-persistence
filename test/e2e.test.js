const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-http'));

const server = require('../server');


describe('running http server', () => {
  const request = chai.request(server);

  var dino = '{"name": "trex"}';

  it('GET', (done) =>{
    request
      .get('/dinosaurs/trex.json')
      .end((res) =>{
        assert.equal(res.text, dino);
      });
    done();
  });

  it('POST', (done) => {
    request
      .post('/dinosaurs')
      .send(dino)
      .end((res) =>{
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.name, dino.name);
        assert.equal(res.type, 'application/json');
      });
    done();
  });

});
