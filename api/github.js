require('dotenv').config({ path: '../.env' });
const request = require('request');

/**
 * Gets a complete gist from the Github api given an ID.
 * @param {string} id
 */
function getGist(id) {
    return new Promise((resolve, reject) => {
        const url = `${process.env.GITHUB_GIST_URL}${id}`;
        const options = {
            headers: { 'user-agent': 'node.js' },
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
            reject(new Error('Dataset is not a JSON object'));
        }

        if (Object.keys(dataset).length === 0) {
            reject(new Error('JSON given as param is emtpy.'));
        }

        const url = `${process.env.GITHUB_GIST_URL}${id}`;
        const gistObject = {
            description: 'Crypto Developer Repositories',
            files: {
                [filename]: {
                    content: dataset,
                },
            },
        };

        const options = {
            method: 'PATCH',
            headers: {
                'user-agent': 'node.js',
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            json: gistObject,
        };

        request(url, options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve('Gist updated.');
            } else if (error) {
                reject(error);
            } else {
                reject(new Error(`${response.statusCode} : ${body.message}`));
            }
        });
    });
}

/**
 * Takes in an Github repository URL and extracts the username from it then returns
 * that username as a string.
 * @param {string} repo
 * @returns {string} username
 */
function filterUsernameFromRepo(repo) {
    if (!repo || typeof repo !== 'string') {
        console.log('No URL was passed in to filter');
        return;
    }

    const stringArray = repo.split('/');

    if (stringArray[2] !== 'github.com') {
        console.log('The URL is not a Github URL');
        return;
    }

    return stringArray[3];
}

/**
 * Gets all public Github repositories for a given username and returns an array.
 * @param {string} username 
 * @returns repositories
 */
function getRepositoriesForUser(username) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    const options = {
        headers: { 'user-agent': 'node.js' },
    };

    request(url, options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            return JSON.parse(body);
        } else {
            console.error(`${response.statusCode} : ${body.message}`);
        }
    });
}

module.exports = {
    getGist,
    updateGist,
    filterUsernameFromRepo,
    getRepositoriesForUser
};
