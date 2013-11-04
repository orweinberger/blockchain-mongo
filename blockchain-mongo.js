var blockchain = require('blockchain-json-api');
var mongo = require('./lib/mongo');

var options = {
  speed: 2000, // Run every X ms
  tryResume: true // Settings this to true will fetch the last block height and resume the db insertion
}
bc = new blockchain();

var blockindex = 1;
setInterval(function () {
  bc.API('block-index', blockindex, function (res) {
    mongo.insert('block-height', res, function () {
      console.log('Inserted block index: ' + blockindex);
      blockindex++;
    });
  });
}, options.speed);
