var
  mongo = require('./lib/mongo'),

  blockchain = require('blockchain-json-api');

var options = {
  speed: 1000, // Run every X ms
  tryResume: true // Settings this to true will fetch the last block index and resume the db insertion
};

var bc = new blockchain();
var blockIndex = 1;

var process = function () {
  bc.API('block-index', blockIndex, function (res, err) {
    if (err)
    //output the error, but keep running without changing the last index;
      return console.log('Error!', err);

    mongo.insert('blocks', res, function () {
      console.log('Inserted block index: ' + blockIndex);
      blockIndex++;
    });
  });

  setTimeout(process, options.speed);
};

if (options.tryResume) {
  mongo.fetch('blocks', {}, {"sort": {"block_index": -1}, "limit": 1}, function (err, res) {
    if (err)
      throw err;

    if (res && res[0] && res[0].block_index)
      blockIndex = res[0].block_index + 1;

    process();
  });
}
else
  process();