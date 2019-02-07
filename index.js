const sleep = require('util').promisify(setTimeout);
const coingecko = require('./api');

async function init() {
    let listOfAssets;

    try {
        listOfAssets = await coingecko.getAllAssets();
    } catch (err) {
        console.log(err);
    }

    if (listOfAssets) {
        for (let i = 0; i < listOfAssets.length; i++) {
            await sleep(500); // Throttle for api rate limits.
            let asset = await coingecko.getAssetData(listOfAssets[i].id);
            console.log(`Completed fetch for: ${asset.id}`);
        }

        // Write all assets to a local JSON file
        var fileContents = JSON.stringify(listOfAssets, null, 2);
        fs.writeFile('gist/allCoins.json', fileContents, 'utf8', () => {
            console.log('All Assets File Write completed');
        });
    }
}

init();
