const github = require('../api/github');

describe('Github API communications', () => {
    it('should load user repositories', () => {
        return github.getRepositoriesForUser('h-gomez').then(data => {
            expect(data).toBeDefined();
            expect(data.message).toUndefined();
        });
    });
});
