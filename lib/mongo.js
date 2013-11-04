var
  mongodb = require('mongodb').MongoClient;

var _db = null;

exports.openConnection = function (callback) {
  if (_db)
    return callback(_db);

  var options = {};
  mongodb.connect("mongodb://localhost/blockchain", options, function (err, db) {
    if (err)
      return callback(err);

    _db = db;
    return callback(null, db);
  });
};

exports.closeConnection = function (db, callback) {
  db.close();
  db = null;
  callback(null);
};

exports.insert = function (collectionName, data, callback) {
  var self = this;
  var insert = function () {
    var options = {};
    _db.collection(collectionName, options, function (err, collection) {
      if (err)
        return callback(err);
      collection.insert(data, {}, function (err) {
        if (err)
          return callback(err);

        return callback(null);
      });
    });
  };

  if (!_db)
    self.openConnection(function () {
      return insert();
    });
  else
    return insert();
};

exports.fetch = function (collectionName, query, options, callback) {
  var self = this;
  var _fetch = function () {
    _db.collection(collectionName, options, function (err, collection) {
      if (err)
        return callback(err);
      collection.find(query).sort(options.sort).limit(options.limit).toArray(function (err, data) {
        if (err)
          return callback(err);

        return callback(null, data);
      });
    });
  };

  if (!_db)
    self.openConnection(function () {
      return _fetch();
    });
  else
    return _fetch();
};