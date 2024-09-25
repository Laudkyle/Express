const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect('mongodb://rootuser:rootpass@localhost:27017')
        .then((client) => {
            dbConnection = client.db();
            return cb();
        }).catch((error) => {
            console.log(error);
            return cb(error);  // Use "error" instead of "err" to match the variable name
        });
    },
    getDb: () => dbConnection
}
