const github = require('../api/github');

describe('Github API communications', () => {
    test('should get a gist from github API', () => {
        return github.getGist('137c9c481c8c5756519f991ade64253a').then(data => {
            expect(data).toBeDefined();
        });
    });

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
