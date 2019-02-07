require('dotenv').config({ path: '../.env' });
const request = require('request');

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

function updateGist() {}

async function init() {
    let gist = await getGist(process.env.GIST_ID);
    console.log(gist);
}

init();
