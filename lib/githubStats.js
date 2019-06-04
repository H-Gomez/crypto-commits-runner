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

/**
 * Takes an array of commit histories returns the total count using reduce.
 * @param {array} commitHistory
 */
function sumTotalCommits(commitHistory) {
    const initialValue = 0;
    const totalCommitCount = commitHistory.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, initialValue);

    return totalCommitCount;
}

/**
 * Takes in an array of repositories commit histories and reduces them to find the sum of each index.
 * @param {array} repositories
 */
function sumCommitHistory(repositories) {
    let reducedArray = [];

    reducedArray = repositories.reduce((accumulator, currentValue) => {
        return currentValue.all.map((item, index) => {
            return (accumulator[index] || 0) + item;
        });
    });

    return reducedArray;
}

module.exports = {
    sumPropertyValues,
    sumTotalCommits,
    sumCommitHistory,
};
