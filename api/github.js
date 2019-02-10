require('dotenv').config({ path: '../.env' });
const request = require('request');

/**
 * Gets a complete gist from the Github api given an ID.
 * @param {string} id
 */
function getGist(id) {
    return new Promise((resolve, reject) => {
        const url = process.env.GITHUB_GIST_URL + id;
        const options = {
            headers: { 'user-agent': 'node.js' }
        };

        request(url, options, (error, reponse, body) => {
            if (!error) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

/**
 * Updates a gist given an id with the new content.
 * @param {string} id
 * @param {object} dataset
 */
function updateGist(id, dataset) {
    return new Promise((resolve, reject) => {
        if (!typeof dataset === Object) {
            reject('Dataset is not a JSON object');
        }
    
        if (Object.keys(dataset).length === 0) {
            reject('JSON given as param is emtpy.');
        }
    
        const url = process.env.GITHUB_GIST_URL + id;
        const gistObject = {
            description: 'Crypto Developer Repositories',
            files: {
                'projects.json': {
                    content: JSON.stringify(dataset);
                }
            }
        };
    
        const options = {
            method: 'PATCH',
            headers: {
                'user-agent': 'node.js',
                Authorization: 'token ' + process.env.GITHUB_TOKEN
            },
            json: gistObject
        };
    
        request(url, options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    }).catch(err => console.log(err));
}

async function init() {
    //let gist = await getGist(process.env.GIST_ID);
    //console.log(gist);

    var data = [
        {
            id: 'zcoin',
            name: 'Zcoin',
            symbol: 'xzc',
            sectors: ['Privacy Coins', 'Masternodes'],
            country_origin: '',
            repos: [
                'https://github.com/zcoinofficial/zcoin',
                'https://github.com/zcoinofficial/zcore-lib',
                'https://github.com/zcoinofficial/electrumx',
                'https://github.com/zcoinofficial/electrum-xzc'
            ],
            developer_data: {
                forks: 267,
                stars: 359,
                subscribers: 107,
                total_issues: 165,
                closed_issues: 127,
                pull_requests_merged: 128,
                pull_request_contributors: 28,
                commit_count_4_weeks: 16
            }
        },
        {
            id: 'neo',
            name: 'NEO',
            symbol: 'neo',
            sectors: ['Smart Contract Platform'],
            country_origin: '',
            repos: [
                'https://github.com/neo-project/neo',
                'https://github.com/neo-project/neo-cli',
                'https://github.com/neo-project/neo-gui',
                'https://github.com/CityOfZion/neon-js',
                'https://github.com/CityOfZion/neo-python'
            ],
            developer_data: {
                forks: 868,
                stars: 2743,
                subscribers: 424,
                total_issues: 295,
                closed_issues: 215,
                pull_requests_merged: 179,
                pull_request_contributors: 29,
                commit_count_4_weeks: 21
            }
        }
    ];

    try {
        let res =  await updateGist(process.env.GIST_ID, data);
        console.log(res);
    } catch (error) {
        console.log('Update gist failed: ' + error);
    }
}

init();
