require('dotenv').config({ path: '../.env' });
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
let database;

/**
 * Establish a connect to the database is one does not exist.
 */
function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (error, client) => {
            if (error) {
                reject(`-- Unable to connect to MongoDB: ${error}`);
            }

            database = client.db('crypto-commits');
            resolve('Connected to MongoDB');
        });
    });
}

/**
 * Deletes all documents from the given collection.
 */
function deleteAllCollections() {
    return new Promise((resolve, reject) => {
        database.collection('assets').remove({}, (error, response) => {
            if (error) {
                reject(`-- Unable to delete all documents from collection: ${error}`);
            } else {
                resolve('All records deleted from collection.'); 
            }
        })
    }).catch(err => new Error(err));
}

/**
 * Inserts a single asset object into the database.
 * @param {object} asset
 */
function insertAsset(asset) {
    return new Promise((resolve, reject) => {
        let collection = database.collection('assets');
        collection.insertOne(asset, (error, inserted) => {
            if (error) {
                reject(`--Failed DB insert for: ${error}`);
            } else {
                resolve(`Insert completed for: ${asset.id}`);
            }
        });
    }).catch(err => console.log(err));
}

/**
 * Inserts a single asset object into the database.
 * @param {object} asset
 */
// function addAssetToDatabase(asset) {
//     const MongoClient = mongodb.MongoClient;
//     const mongoUrl = process.env.MONGO_URL;

//     MongoClient.connect(process.env.MONGO_URL, (error, client) => {
//         if (error) {
//             console.log(`Unable to connect to the database: ${error}`);
//         } else {
//             console.log('Database connection established!');
//             const db = client.db('crypto-commits');
//             const collection = db.collection('assets');
//             collection.insert(asset, (err, inserted) => {
//                 if (err) {
//                     console.log(`Database insert Failed: ${err}`);
//                 } else {
//                     console.log(inserted);
//                 }
//             });
//         }
//     });
// }

/**
 * Updates an asset given a mongoID.
 * @param {object} asset
 */
function updateAsset(asset) {
    return new Promise((resolve, reject) => {
        let collection = database.collection('assets');

        console.log('id: ' + asset._id.$oid + ' type: ' + typeof asset._id.$oid);
        collection.replaceOne({ _id: asset._id.$oid }, { asset }, { upsert: true }, (error, result) => {
            if (error) {
                reject(`--Failed to update: ${error}`);
            } else {
                resolve(`Completed update for: ${result}`);
            }
        });
    }).catch(err => console.log(err));
}

/**
 * Close the database on request.
 */
function closeDatabase() {
    if (database) {
        console.log('Closing DB connection');
        dbClient.close();
    }
}

module.exports = {
    connect,
    insertAsset,
    updateAsset,
    deleteAllCollections
};
