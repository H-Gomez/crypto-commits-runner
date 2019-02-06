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
            await sleep(500);
            let asset = await coingecko.getAssetData(listOfAssets[i].id);
            console.log(asset);
        }

        // Write all assets to a local JSON file
        // var fileContents = JSON.stringify(listOfAssets, null, 2);
        // fs.writeFile('allCoins.json', fileContents, 'utf8', () => {
        //     console.log('All Assets File Write completed');
        // });
    }
}

init();
