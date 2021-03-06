/* Functionality for interacting with the CoinGecko API */
require('dotenv').config();
const request = require('request');

/**
 * Gets the raw JSON from the API endpoint for an individual crypto asset.
 * @param {string} asset
 */
function getAssetData(asset) {
    return new Promise((resolve, reject) => {
        const url = `${process.env.API_URL_COINS}${asset}${process.env.API_OPTIONS}`;
        if (!url) {
            reject('No URL provided');
        }

        request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const json = JSON.parse(body);

                if (!json.links) {
                    reject(`-- No links available for ${json.name}`);
                }

                if (json.links.repos_url.github.length === 0) {
                    reject(`-- No Github Repos found for ${json.name}`);
                }

                const assetObject = {
                    id: json.id,
                    name: json.name,
                    symbol: json.symbol,
                    sectors: json.categories,
                    country_origin: json.country_origin,
                    repos: json.links.repos_url.github,
                    developer_data: json.developer_data,
                };

                resolve(assetObject);
            } else {
                reject(new Error(`-- Unable to get data for coin: ${asset} | StatusCode: ${response.statusCode}`));
            }
        });
    }).catch(error => console.log(error));
}

/**
 * Gets an up to date list of all assets available from the API endpoint
 * and writes them to a JSON file locally.
 */
function getAllAssets() {
    return new Promise((resolve, reject) => {
        if (!process.env.API_URL_LIST) {
            console.log(process.env.API_URL_LIST);
            reject('No URL found to get all Assets.');
        }

        request(process.env.API_URL_LIST, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const json = JSON.parse(body);
                resolve(json);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = {
    getAssetData,
    getAllAssets,
};
