/** TODO
 * Get number of commits per repository
 * Get number of forks a users has against their repositories
 */

const github = require('../api/github');

/**
 * Takes an array of repository objects for a user and returns the total number
 * of stars for that dataset.
 * @param {array} repositories
 */
function usersTotalStars(repositories) {
    const initialValue = 0;
    const stars = repositories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.stargazers_count;
    }, initialValue);

    return stars;
}

function usersTotalCommits() {}

function usersTotalWatchers(repositories) {
    const initialValue = 0;
    const watchers = repositories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.watchers_count;
    }, initialValue);

    return watchers;
}

function usersTotalForks(repositories) {
    const initialValue = 0;
    const forks = repositories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.forks_count;
    }, initialValue);

    return forks;
}

function usersTotalIssues(repositories) {
    const initialValue = 0;
    const issues = repositories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.open_issues_count;
    }, initialValue);

    return issues;
}

module.exports = {
    usersTotalStars,
    usersTotalWatchers,
    usersTotalCommits,
    usersTotalForks,
    usersTotalIssues,
};
