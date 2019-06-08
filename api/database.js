require('dotenv').config({ path: '../.env' });
const mongodb = require('mongodb');

function addAssetToDatabase(asset) {
    const MongoClient = mongodb.MongoClient;
    const mongoUrl = process.env.MONGO_URL;

    MongoClient.connect(mongoUrl, (error, client) => {
        if (error) {
            console.log(`Unable to connect to the database: ${error}`);
        } else {
            console.log('Database connection established!');
            const db = client.db('crypto-commits');
            const collection = db.collection('assets');
            collection.insert(asset, (err, inserted) => {
                if (err) {
                    console.log(`Database insert Failed: ${err}`);
                } else {
                    console.log(inserted);
                }
            });
        }
    });
}

module.exports = {
    addAssetToDatabase,
};
