const MongoClient = require('mongodb').MongoClient;
import * as assert from 'assert';

class Model {
    private client: any;
    private dbUrl: string = 'mongodb://localhost:27017';
    private dbName: string = 'blog';

    constructor() {
        this.client = null;
    }

    createConnect() {
        return new Promise((resolve, reject) => {
            this.client = new MongoClient(this.dbUrl, { useUnifiedTopology: true });
            this.client.connect((err: Error) => {
                if (err) {
                    reject(err);
                }
                console.log("Connected successfully to server");
                const db = this.client.db(this.dbName);
                resolve(db);
            });
        });
    }

    insertDocuments(collectionName: string, documents: object) {
        return this.createConnect().then((db: any) => {
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Insert some documents
            return new Promise((resolve, reject) => {
                collection.insertMany(documents, (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    assert.equal(1, result.ops.length);
                    resolve(result);
                    this.closeConnect();
                });
            });
        });
    }

    queryDocuments(collectionName: string, query: object): Promise<[]> {
        return this.createConnect().then((db: any) => {
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Insert some documents
            return new Promise((resolve, reject) => {
                collection.find(query).toArray((err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    }
                    assert.equal(err, null);
                    resolve(result);
                    this.closeConnect();
                });
            });
        });
    }

    closeConnect() {
        this.client.close();
    }
}

export default Model;
