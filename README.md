# Crypto Commits Runner
A simple NodeJS application which gets a list of crypto assets (coins and tokens) from an API endpoint then checks each one for it's associated Github repositories. 

The output of this is written locally to JSON file called `projects.json` and as well as attemping to write to a Github gist if the correct token and gist Id is provided. Intended to be run on a schedule using Heroku.

## Installation
1. Clone the repository.
2. run `npm install` to get the dependancies.
3. run `npm start` to begin fetching the data.

Each crypto project object will have the following structure:
```
{
    "id": "neo",
    "name": "NEO",
    "symbol": "neo",
    "sectors": ["Smart Contract Platform"],
    "country_origin": "",
    "repos": [
        "https://github.com/neo-project/neo",
        "https://github.com/neo-project/neo-cli",
        "https://github.com/neo-project/neo-gui",
        "https://github.com/CityOfZion/neon-js",
        "https://github.com/CityOfZion/neo-python"
    ],
    "developer_data": {
        "forks": 868,
        "stars": 2743,
        "subscribers": 424,
        "total_issues": 295,
        "closed_issues": 215,
        "pull_requests_merged": 179,
        "pull_request_contributors": 29,
        "commit_count_4_weeks": 21
    }
}
```

> Data is sourced from Coingecko which has an API rate limit of 300 calls/minute so the requests are throttled. 

