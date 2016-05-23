const chai = require('chai');
const assert = chai.assert;
chai.use(require('chai-http'));

const app = require('../app');

describe('running http sever', () => {
  const request = chai.request(app);

  describe('POST and GET a dino', () => {
    var dino = {name: 'trex'};
    var id = -1;

    function isJSONResponse(res){
      assert.equal(res.statusCode, 200);
      assert.equal(res.type, 'application/json');
      assert.ok(res.body);
    }

    it('POST', done => {
      request
        .post('/dinosaurs')
        .send(dino)
        .then(res => {
          isJSONResponse(res);

          assert.equal(res.body.name, dino.name);
          assert.property(res.body, id);
        });
      done();
    });

    it('GET', done => {
      request.get('/dinosaurs/${id}')
        .then( res => {
          isJSONResponse(res);
          assert.equal(res.body.name, dino.name);
        });
      done();
    });
  });
});
