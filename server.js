const http = require('http');
const path = require('path');
const db = require('./data');

var server = http.createServer((req, res) => {
  var baseName = path.parse(req.url).base;

  if(req.method === 'GET'){
    db.database.fetchAll(function(err, array){
      var index = array.indexOf(baseName);
      if(index !== -1){
        db.database.read(array[index], function(contents){
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(contents);
          res.end();
        });
      }
    });
  }
});

module.exports = server;
