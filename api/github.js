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
 */
function updateGist(id) {
    const url = process.env.GITHUB_GIST_URL + id;

    const gistObject = {
        description: 'Crypto Developer Repositories',
        files: {
            'projects.json': {
                content: 'some text'
            }
        }
    };

    const options = {
        method: 'PATCH',
        headers: { 'user-agent': 'node.js', Authorization: process.env.GITHUB_TOKEN },
        json: JSON.stringify(gistObject)
    };

    request(url, options, (error, response, body) => {
        if (!error) {
            console.log(response.statusCode);
        } else {
            console.log(error);
        }
    });
}

async function init() {
    //let gist = await getGist(process.env.GIST_ID);
    //console.log(gist);

    try {
        updateGist(process.env.GIST_ID);
    } catch (error) {
        console.log('Update gist failed' + error);
    }
}

init();
