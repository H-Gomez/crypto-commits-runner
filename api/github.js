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

        request(url, options, (error, response) => {
            if (!error) {
                resolve(response);
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
        return false;
    }

    const stringArray = repo.split('/');

    if (stringArray[2] !== 'github.com') {
        console.log('The URL is not a Github URL');
        return false;
    }

    return stringArray[3];
}

/**
 * Gets all public Github repositories for a given username and returns an array.
 * @param {string} username
 * @returns repositories
 */
function getRepositoriesForUser(username) {
    return new Promise((resolve, reject) => {
        const url = `https://api.github.com/users/${username}/repos?per_page=100`;
        const options = {
            headers: { 'user-agent': 'node.js', Authorization: `Token ${process.env.GITHUB_RATE_TOKEN}` },
        };

        request(url, options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const json = JSON.parse(body);
                resolve(json);
            } else if (error) {
                reject(error);
            } else {
                reject(new Error(`${response.statusCode} : ${body}`));
            }
        });
    });
}

/**
 * Gets the commit statistics for a repository returned as a weekly count.
 * @param {string} username
 * @param {string} repo
 * @returns json
 */
function getCommitStatsForRepo(username, repo) {
    return new Promise((resolve, reject) => {
        const url = `https://api.github.com/repos/${username}/${repo}/stats/participation`;
        const options = {
            headers: { 'user-agent': 'node.js', Authorization: `Token ${process.env.GITHUB_RATE_TOKEN}` },
        };

        request(url, options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const json = JSON.parse(body);
                resolve(json);
            } else if (error) {
                reject(error);
            } else {
                reject(new Error(`${response.statusCode} : ${body.message}`));
            }
        });
    });
}

module.exports = {
    getGist,
    updateGist,
    filterUsernameFromRepo,
    getRepositoriesForUser,
    getCommitStatsForRepo,
};
