[![Build Status](https://travis-ci.org/orweinberger/blockchain-mongo.png?branch=master)](https://travis-ci.org/orweinberger/blockchain-mongo)

#blockchain-mongo

You can use blockchain-mongo to load the entire blockchain to a MongoDB collection, it uses the service provided by blockchain.info.

Since the process can be quite lengthy, there is also an option to resume loading (true by default).

Feel free to contribute and use.

###Before installing
Make sure you have the a local running mongodb instance.

###Install
```bash
npm install blockchain-mongo
```

###Usage
```bash
npm start
```

This will start loading the blockchain data into a db named 'blockchain' on your locally hosted MongoDB instance.

####Configuration
Currently there are two configurable parts, ```options``` in the main script and the mongo connection string in ```lib/mongo.js```.

###Tests
Feel free to contribute by adding tests :)

###IMPORTANT

Please read about the API query limits to avoid getting your IP banned

http://blockchain.info/api

[1]: http://blockchain.info
[2]: http://blockchain.info/api
