const sleep = require('util').promisify(setTimeout);
const coingecko = require('./api/coingecko');
const github = require('./api/github');

async function init() {
    let listOfAssets;

    try {
        listOfAssets = await coingecko.getAllAssets();
    } catch (err) {
        throw new Error('Unable to get list of assets from API');
    }

    if (listOfAssets) {
        for (let i = 0; i < listOfAssets.length; i++) {
            await sleep(500); // Throttle for api rate limits.
            let asset = await coingecko.getAssetData(listOfAssets[i].id);
            console.log(`Completed fetch for: ${asset.id}`);
        }

        // Write all assets to a local JSON file
        var fileContents = JSON.stringify(listOfAssets, null, 2);
        fs.writeFile('gist/projects.json', fileContents, 'utf8', () => {
            console.log('All Assets File Write completed');
        });

        // Update Github gist with new file contents
        try {
            let res = await updateGist(process.env.GIST_ID, data);
            console.log(res);
        } catch (error) {
            console.log('Update gist failed: ' + error);
        }
    }
}

init();
