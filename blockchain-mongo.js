var blockchain = require('blockchain-json-api');
var mongo = require('./lib/mongo');

var options = {
  speed: 2000, // Run every X ms
  tryResume: true // Settings this to true will fetch the last block index and resume the db insertion
}
bc = new blockchain();

var blockindex = 1;

if (options.tryResume) {
  mongo.fetch('blocks', {}, {"sort": {"block_index": -1}, "limit": 1}, function (err, res) {
    if (res && res[0] && res[0].block_index)
      blockindex = res[0].block_index + 1;
  });
}

setInterval(function () {
  bc.API('block-index', blockindex, function (res) {
    mongo.insert('blocks', res, function () {
      console.log('Inserted block index: ' + blockindex);
      blockindex++;
    });
  });
}, options.speed);
