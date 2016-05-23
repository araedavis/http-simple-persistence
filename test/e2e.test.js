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
      .end((err, res) =>{
        if(err) console.log(err);
        assert.equal(res.text, dino);
      });
    done();
  });

  it('POST', (done) => {
    request
      .post('/dinosaurs')
      .send(dino)
      .end((err, res) =>{
        if(err) console.log(err);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.name, dino.name);
        assert.equal(res.type, 'application/json');
      });
    done();
  });

  it('PUT', (done) => {
    request
      .put('/dinosaurs/trex.json')

      .end((err, res) => {
        if (err) console.log(err);
        assert.equal(res.statusCode, 200);
      });
    done();
  });

  it('DELETE', (done) => {
    request
      .delete('')
      .end((err, res) => {
        if(err) console.log(err);
        assert.equal(res.statusCode, 200);
      });
    done();
  });
});
