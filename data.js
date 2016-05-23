const fs = require('fs');
var database = {};

database.directory = './data';

database.fetchAll = function(callback){
  fs.readdir(database.directory, (err, fileNames) => {
    if(err) throw err;
    callback(null, fileNames);
  });
};

database.read = function(file, callback){
  fs.readFile(`${database.directory}/${file}`, (err, content) =>{
    callback(content.toString());
  });
};

database.write = function(newFile, content){
  var writeStream = fs.createWriteStream(`${database.directory}/${newFile}`);
  writeStream.write(content);
};

database.destroy = function(path, callback){
  fs.unlink(`${database.directory}/${path}`, (err) => {
    if(err) callback(err);
    else callback();
  });
};

module.exports = database;
