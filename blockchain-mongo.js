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
    if (err) {
      blockIndex++;
      return console.log('Error!', err, blockIndex);
    }
      
    res.tx.forEach(function(tx) {
      tx.block_hash = res.hash;
      mongo.insert('bc_tx', tx, function() {
        console.log('Inserted tx: ' + tx.hash);
      });
    });
    delete res['tx'];
    mongo.insert('bc_block', res, function () {
      console.log('Inserted block index: ' + blockIndex);
      blockIndex++;
    });
  });

  setTimeout(process, options.speed);
};

if (options.tryResume) {
  mongo.fetch('bc_block', {}, {"sort": {"block_index": -1}, "limit": 1}, function (err, res) {
    if (err)
      throw err;

    if (res && res[0] && res[0].block_index)
      blockIndex = res[0].block_index + 1;

    process();
  });
}
else
  process();