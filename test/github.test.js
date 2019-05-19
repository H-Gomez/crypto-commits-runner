const github = require('../api/github');

describe('Github API communications', () => {
    test('should load user repositories', () => {
        return github.getRepositoriesForUser('h-gomez').then(data => {
            expect(data).toBeDefined();
            expect(data.message).toBeUndefined();
        });
    });

    test('should filter username from github url', () => {
        expect(github.filterUsernameFromRepo('https://github.com/H-Gomez/crypto-commits-runner')).toEqual('H-Gomez');
    });
});
