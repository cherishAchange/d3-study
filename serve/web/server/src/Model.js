const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class Model {
    constructor() {
        this.client = null;
    }

    createConnect() {
        return new Promise((resolve, reject) => {
            this.client = new MongoClient(Model.dbUrl, { useUnifiedTopology: true });
            this.client.connect((err) => {
                if (err) {
                    reject(err);
                }
                console.log("Connected successfully to server");
                const db = this.client.db(Model.dbName);
                resolve(db);
            });
        });
    }

    insertDocuments(collectionName, documents, callback) {
        this.createConnect().then(db => {
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Insert some documents
            collection.insertMany(documents, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                callback(result);
                this.closeConnect();
            });
        }).catch(err => {
            callback(err);
        });
    }

    closeConnect() {
        this.client.close();
    }
}

Model.dbUrl = 'mongodb://localhost:27017';
Model.dbName = 'blog';

module.exports = Model;
