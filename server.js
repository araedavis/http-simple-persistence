const http = require('http');
const path = require('path');
const database = require('./database');

var server = http.createServer((req, res) => {
  var baseName = path.parse(req.url).base;

//GET
  if(req.method === 'GET'){
    database.fetchAll(function(err, array){
      var index = array.indexOf(baseName);
      if(index !== -1){
        database.read(array[index], function(contents){
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(contents);
          console.log(baseName);
          res.end();
        });

//POST/PUT

      } else if(req.method === 'POST' || 'PUT'){
        var body = '';
        req.on('data', chunk =>{
          body += chunk;
        });
        req.on('end', () => {
          database.write(baseName, body);
          res.end();
        });

  //DELETE
      } else if (req.method === 'DELETE'){
        database.destroy(baseName, (err) => {
          if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(`${baseName} not found.`);
            res.end();

          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(`${baseName} is now extinct.`);
          }
        });

//ERR
      } else {
        res.write('Yikes, that did not go so well. Try again.');
      }
    });
  }
});

module.exports = server;
