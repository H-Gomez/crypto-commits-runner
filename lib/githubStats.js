/**
 * Takes an array of repository objects for a user and returns the total count
 * of the given property for that dataset.
 * @param {array} repositories
 * @param {string} property
 */
function sumPropertyValues(repositories, property) {
    const initialValue = 0;
    const totalCount = repositories.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[property];
    }, initialValue);

    return totalCount;
}

function sumTotalCommits(commitHistory) {
    const initialValue = 0;
    const totalCommitCount = commitHistory.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, initialValue);

    return totalCommitCount;
}

module.exports = {
    sumPropertyValues,
    sumTotalCommits,
};
