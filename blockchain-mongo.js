var
//mongo = require('./lib/mongo'),
  joolaio = require('joola.io.sdk');
blockchain = require('blockchain-json-api');

var options = {
  speed: 1000, // Run every X ms
  tryResume: false // Settings this to true will fetch the last block index and resume the db insertion
};

var bc = new blockchain();
var blockIndex = 465800;

joolaio.init({host: 'http://localhost:8080', APIToken: '12345'}, function (err) {
  var process = function () {
    bc.API('block-index', blockIndex, function (res, err) {
      if (err) {
        blockIndex--;
        return setTimeout(process, options.speed);
      }
      res.tx.forEach(function (tx) {
        tx.tx_size = tx.size;
        tx.tx_relayed_by = tx.relayed_by;
        tx.timestamp = new Date(tx.time * 1000);

      });

      joolaio.beacon.insert('bc_tx', res.tx, function (err,result) {
        delete res['tx'];
        res.timestamp = new Date(res.time * 1000);
        res.block_size = res.size;
        res.block_relayed_by = res.relayed_by;
        blockIndex--;
        joolaio.beacon.insert('bc_block', res, function () {
          console.log('Inserted block index: ' + blockIndex);
          setTimeout(process, options.speed);
        });
      });
    });


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
});