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

function sumTotalCommits(repositories) {
    return null;
}

module.exports = {
    sumPropertyValues,
    sumTotalCommits,
};