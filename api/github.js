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
                    content: JSON.stringify(dataset)
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
        console.log('Trying gist update');
        request(url, options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    }).catch(err => console.log(err));
}

module.exports = {
    getGist: getGist,
    updateGist: updateGist
}
