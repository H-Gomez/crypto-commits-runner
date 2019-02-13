const sleep = require('util').promisify(setTimeout);
const fs = require('fs');
const coingecko = require('./api/coingecko');
const github = require('./api/github');

async function init() {
    let listOfAssets = [];
    const filteredAssets = [];

    // Get updated list of crypto assets from the API endpoint.
    try {
        listOfAssets = await coingecko.getAllAssets();
    } catch (err) {
        throw new Error('Unable to get list of assets from API');
    }

    // Itereate over each asset and get it's detailed information.
    if (listOfAssets) {
        for (let i = 0; i < 5; i++) {
            await sleep(500); // Throttle for api rate limits.
            const asset = await coingecko.getAssetData(listOfAssets[i].id);
            if (typeof asset !== 'undefined') {
                filteredAssets.push(asset);
                console.log(`Completed fetch for: ${listOfAssets[i].id}`);
            }
        }

        // Write all assets to a local JSON file
        const fileContents = JSON.stringify(filteredAssets, null, 2);
        fs.writeFile('gist/projects.json', fileContents, 'utf8', () => {
            console.log('All Assets File Write completed');
        });

        // Update Github gist with new file contents
        if (process.env.GIST_ID.length && process.env.GITHUB_TOKEN) {
            try {
                const result = await github.updateGist(process.env.GIST_ID, 'projects.json', fileContents);
                console.log(result);
            } catch (error) {
                console.log(`-- Update gist failed: ${error}`);
            }
        } else {
            throw new Error('-- Skipping upload to Gist as not ID or token available.');
        }

        // Update Gist with new timestamp from README template.
        const readMe = fs
            .readFileSync('gist/README.md')
            .toString()
            .split('\n');
        readMe.splice(3, 1, `> Last Updated: ${new Date().toLocaleString()} \n`);
        readMe.splice(4, 1, `\n > Projects: ${filteredAssets.length}`);
        const amendedContents = readMe.join('\n');
        try {
            const result = await github.updateGist(process.env.GIST_ID, 'README.md', amendedContents);
            console.log(result);
        } catch (error) {
            console.log(`-- Update gist failed: ${error}`);
        }
    }
}

init();
