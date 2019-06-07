const sleep = require('util').promisify(setTimeout);
const fs = require('fs');
const coingecko = require('./api/coingecko');
const github = require('./api/github');
const githubStats = require('./lib/githubStats');

/**
 * Handles all of the Github stats collection when passed an asset object. Is responsible for
 * identifying the owner of the asset's repositories then checking each one for it's respective
 * stars, watchers, fork and issues.
 * @param {array} repos
 */
async function getStatsForAsset(username, repos) {
    const allCommitHistories = [];
    let totalCommits = 0;
    let totalCommitHistory = 0;

    // Loop over each repository item in the array and get it's commit history from github
    for (let y = 0; y < repos.length; y += 1) {
        if (repos[y].archived === false) {
            allCommitHistories.push(github.getCommitStatsForRepo(username, repos[y].name));
        }
    }

    await Promise.all(allCommitHistories).then(data => {
        totalCommits = data.reduce((accumulator, currentValue) => {
            return accumulator + githubStats.sumTotalCommits(currentValue.all);
        }, 0);
        totalCommitHistory = githubStats.sumCommitHistory(data);
    });

    const developer_data = {
        total_commits: totalCommits,
        repos_count: repos.length,
        forks: githubStats.sumPropertyValues(repos, 'forks_count'),
        stars: githubStats.sumPropertyValues(repos, 'stargazers_count'),
        subscribers: githubStats.sumPropertyValues(repos, 'watchers_count'),
        total_issues: githubStats.sumPropertyValues(repos, 'open_issues_count'),
        commit_history_52_weeks: totalCommitHistory,
    };

    return developer_data;
}

async function init() {
    let listOfAssets = [];
    const filteredAssets = [];

    // Get updated list of crypto assets from the API endpoint.
    try {
        listOfAssets = await coingecko.getAllAssets();
    } catch (err) {
        throw new Error('Unable to get list of assets from API');
    }

    // Itereate over each asset and get it's detailed information. Throttled using sleep.
    if (listOfAssets) {
        for (let i = 0; i < listOfAssets.length; i += 1) {
            await sleep(2000); // eslint-disable-line
            let asset = await coingecko.getAssetData(listOfAssets[i].id); // eslint-disable-line
            if (typeof asset !== 'undefined') {
                const githubUsername = github.filterUsernameFromRepo(asset.repos[0]);
                await github.getRepositoriesForUser(githubUsername).then(async (repos) => {
                    asset.repos = repos;
                    asset.developer_data = await getStatsForAsset(githubUsername, asset.repos); // eslint-disable-line
                    filteredAssets.push(asset);
                    console.log(`Completed fetch for: ${listOfAssets[i].id}`);
                }).catch(error => {
                    console.log(`Unable to complete ${asset.id} : ${error}`);
                });
            } else {
                console.log(`---Skipped as undefined ${listOfAssets[i].id}`);
            }
        }

        // Write all assets to a local JSON file
        const fileContents = JSON.stringify(filteredAssets);
        fs.writeFile('gist/projects.json', fileContents, 'utf8', () => {
            console.log('All Assets File Write completed');
        });

        // Update Github gist with new file contents
        // if (process.env.GIST_ID.length && process.env.GITHUB_TOKEN) {
        //     try {
        //         const result = await github.updateGist(process.env.GIST_ID, 'projects.json', fileContents);
        //         console.log(result);
        //     } catch (error) {
        //         console.log(`-- Update gist failed: ${error}`);
        //     }
        // } else {
        //     throw new Error('-- Skipping upload to Gist as not ID or token available.');
        // }

        // Update Gist with new timestamp from README template.
        // const readMe = fs
        //     .readFileSync('gist/README.md')
        //     .toString()
        //     .split('\n');
        // readMe.splice(3, 1, `> Last Updated: ${new Date().toLocaleString()} \n`);
        // readMe.splice(4, 1, `\n > Projects: ${filteredAssets.length}`);
        // const amendedContents = readMe.join('\n');
        // try {
        //     const result = await github.updateGist(process.env.GIST_ID, 'README.md', amendedContents);
        //     console.log(result);
        // } catch (error) {
        //     console.log(`-- Update gist failed: ${error}`);
        // }
    }
}

init();
