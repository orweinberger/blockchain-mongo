#blockchain-mongo

You can use blockchain-mongo to load the entire blockchain to a MongoDB collection, it uses the service provided by blockchain.info[1].

Since the process can be quite lengthy, there is also an option to resume loading (true by default).

Feel free to contribute and use.

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


###Tests
Feel free to contribute by adding tests :)

###IMPORTANT

Please read about the API query limits to avoid getting your IP banned

http://blockchain.info/api

[1]: http://blockchain.info
[2]: http://blockchain.info/api
