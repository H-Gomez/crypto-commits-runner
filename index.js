const sleep = require('util').promisify(setTimeout);
const fs = require('fs');
const coingecko = require('./api/coingecko');
const github = require('./api/github');

async function init() {
    let listOfAssets = [];
    let filteredAssets = [];

    // Get updated list of crypto assets from the API endpoint.
    try {
        listOfAssets = await coingecko.getAllAssets();
    } catch (err) {
        throw new Error('Unable to get list of assets from API');
    }

    // Itereate over each asset and get it's detailed information.
    if (listOfAssets) {
        for (let i = 0; i < 10; i++) {
            await sleep(500); // Throttle for api rate limits.
            let asset = await coingecko.getAssetData(listOfAssets[i].id);
            if (typeof asset !== 'undefined') {
                filteredAssets.push(asset);
                console.log(`Completed fetch for: ${listOfAssets[i].id}`);
            }
        }

        // Write all assets to a local JSON file
        var fileContents = JSON.stringify(filteredAssets, null, 2);
        fs.writeFile('gist/projects.json', fileContents, 'utf8', () => {
            console.log('All Assets File Write completed');
        });

        // Update Github gist with new file contents
        try {
            let result = await github.updateGist(process.env.GIST_ID, fileContents);
            console.log(result);
        } catch (error) {
            console.log(`Update gist failed: + ${error}`);
        }
    }
}

init();
