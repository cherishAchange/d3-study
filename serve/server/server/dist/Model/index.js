"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
class Model {
    constructor() {
        this.dbUrl = 'mongodb://localhost:27017';
        this.dbName = 'blog';
        this.client = null;
    }
    createConnect() {
        return new Promise((resolve, reject) => {
            this.client = new MongoClient(this.dbUrl, { useUnifiedTopology: true });
            this.client.connect((err) => {
                if (err) {
                    reject(err);
                }
                console.log("Connected successfully to server");
                const db = this.client.db(this.dbName);
                resolve(db);
            });
        });
    }
    insertDocuments(collectionName, documents) {
        return this.createConnect().then((db) => {
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Insert some documents
            return new Promise((resolve, reject) => {
                collection.insertMany(documents, (err, result) => {
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
    queryDocuments(collectionName, query) {
        return this.createConnect().then((db) => {
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Insert some documents
            return new Promise((resolve, reject) => {
                collection.find(query).toArray((err, result) => {
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
exports.default = Model;
