require('dotenv').config({ path: '../.env' });
const github = require('../api/github');

describe('Github API communications', () => {
    beforeEach(() => {
        process.env = Object.assign(process.env, { GITHUB_RATE_TOKEN: '5b2501d1dbf551821c7e1c79d2c79edc2dfac940' });
    });

    test('should load user repositories', () => {
        return github.getRepositoriesForUser('nodejs').then(data => {
            expect(data).toBeDefined();
            expect(data.message).toBeUndefined();
        });
    });

    test('should filter username from github url', () => {
        expect(github.filterUsernameFromRepo('https://github.com/nodejs/Release')).toEqual('nodejs');
    });

    test('should get commit activity for a specific repository', () => {
        expect(github.getCommitStatsForRepo('h-gomez', 'crypto-commits-runner')).toBeDefined();
    });
});
