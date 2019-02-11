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

        request(url, options, (error, response, body) => {
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
 * Updates a gist given an id and a filename with the new content.
 * @param {string} id
 * @param {string} filename
 * @param {object} dataset
 */
function updateGist(id, filename, dataset) {
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
                [filename]: {
                    content: dataset
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
            } else if (error) {
                reject(error);
            } else {
                reject(`${response.statusCode} : ${body.message}`);
            }
        });
    });
}

module.exports = {
    getGist: getGist,
    updateGist: updateGist
};
