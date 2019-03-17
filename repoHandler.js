/** TODO
 * Get number of commits per repository
 * Get number of forks a users has against their repositories
 * 
 */

const github = require('./api/github');
const repos = github.getRepositoriesForUser('zcoinofficial');
console.log(repos);

/**
 * Takes an array of repository objects for a user and returns the total number
 * of stars for that dataset. 
 * @param {array} repositories 
 */
function usersTotalStars(repositories) {
    initialValue = 0;
    const stars = repositories.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.stargazers_count;
    }, initialValue);

    return stars;
}

function usersTotalCommits(){

}

function usersTotalForks() {

}

function usersTotalIssues() {

}