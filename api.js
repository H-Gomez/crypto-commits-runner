/* Functionality for interacting with the CoinGecko API */
require('dotenv').config();
const request = require('request');
const fs = require('fs');

/**
 * Gets the raw JSON from the API endpoint.
 * @param {string} asset
 */
function getAssetData(asset) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let url = `${process.env.API_URL_COINS}${asset}${process.env.API_OPTIONS}`;
            request(url, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let json = JSON.parse(body);

                    if (!json.links) {
                        reject(`--No links available for ${json.name}`);
                    }

                    if (json.links.repos_url.github.length === 0) {
                        reject(`--No Github Repos found for ${json.name}`);
                    }

                    let asset = {
                        id: json.id,
                        name: json.name,
                        symbol: json.symbol,
                        name: json.name,
                        sectors: json.categories,
                        country_origin: json.country_origin,
                        repos: json.links.repos_url.github,
                        developer_data: json.developer_data
                    };

                    resolve(asset);
                } else {
                    reject(`-- Unable to get data for coin: ${asset} | StatusCode: ${response.statusCode}`);
                }
            });
        }, 400);
    }).catch(err => console.log(err));
}

/**
 * Gets an up to date list of all assets available from the API endpoint
 * and writes them to a JSON file locally.
 */
function getAllAssets() {
    return new Promise((resolve, reject) => {
        request(process.env.API_LIST_URL, (error, response, body) => {
            let json = JSON.parse(body);
            if (!error & response.statusCode === 200) {
                resolve(json)
            } else {
                reject(`-- Unable to get list of all assets from API. | StatusCode: ${response.statusCode}`)
            }
        });
    });
}

/**
 * Async function for calling the update assets function and handling the
 * writing to a file.
 */
async function updateListOfAssets() {
    let listOfAssets = await getAllAssets();

    if (listOfAssets) {
        // Write all assets to a local JSON file
        var fileContents = JSON.stringify(listOfAssets, null, 2);
        fs.writeFile('allCoins.json', fileContents, 'utf8', () => {
            console.log('All Assets File Write completed');
        });
    }
}

module.epxorts = {
    getAssetData: getAssetData,
    getAllAssets: getAllAssets,
    updateListOfAssets: updateListOfAssets
}
