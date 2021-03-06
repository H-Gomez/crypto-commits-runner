const githubStats = require('../lib/githubStats');

const mockRepo = [
    {
        id: 80959356,
        name: 'mock-repo-1',
        full_name: 'username/mock-repo-1',
        private: false,
        created_at: '2017-02-05T00:55:38Z',
        updated_at: '2018-12-13T22:59:23Z',
        pushed_at: '2018-12-13T22:59:22Z',
        homepage: null,
        size: 241,
        stargazers_count: 5,
        watchers_count: 5,
        language: 'Python',
        has_issues: true,
        has_pages: false,
        forks_count: 0,
        archived: false,
        disabled: false,
        open_issues_count: 5,
        forks: 0,
        open_issues: 5,
        watchers: 5,
        default_branch: 'master',
    },
    {
        id: 809543535,
        name: 'mock-repo-2',
        full_name: 'username/mock-repo-2',
        private: false,
        created_at: '2017-02-05T00:55:38Z',
        updated_at: '2018-12-13T22:59:23Z',
        pushed_at: '2018-12-13T22:59:22Z',
        homepage: null,
        size: 241,
        stargazers_count: 2,
        watchers_count: 2,
        language: 'JavaScript',
        has_issues: true,
        has_pages: false,
        forks_count: 2,
        archived: false,
        disabled: false,
        open_issues_count: 2,
        forks: 2,
        open_issues: 1,
        watchers: 2,
        default_branch: 'master',
    },
];

const mockActivity = {
    all: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        9,
        12,
        0,
        0,
        0,
        2,
        6,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
    ],
};

describe('Github Stats', () => {
    test('should calculate the number of stars for repositories', () => {
        expect(typeof githubStats.sumPropertyValues(mockRepo, 'stargazers_count')).toBe('number');
        expect(githubStats.sumPropertyValues(mockRepo, 'stargazers_count')).toEqual(7);
    });

    test('should calculate the number of watchers for repositories', () => {
        expect(typeof githubStats.sumPropertyValues(mockRepo, 'watchers_count')).toBe('number');
        expect(githubStats.sumPropertyValues(mockRepo, 'watchers_count')).toEqual(7);
    });

    test('should calculate the number of forks for repositories', () => {
        expect(typeof githubStats.sumPropertyValues(mockRepo, 'forks_count')).toBe('number');
        expect(githubStats.sumPropertyValues(mockRepo, 'forks_count')).toEqual(2);
    });

    test('should calculate the number of issues for repositories', () => {
        expect(typeof githubStats.sumPropertyValues(mockRepo, 'open_issues_count')).toBe('number');
        expect(githubStats.sumPropertyValues(mockRepo, 'open_issues_count')).toEqual(7);
    });

    test('should calculate the number of commits from commit history', () => {
        expect(typeof githubStats.sumTotalCommits(mockActivity.all)).toBe('number');
        expect(githubStats.sumTotalCommits(mockActivity.all)).toEqual(31);
    });
});
