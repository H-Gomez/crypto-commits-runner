# Crypto Commits Runner
A simple NodeJS application which gets a list of crypto assets (coins and tokens) from an API endpoint then checks each one for it's associated Github repositories. The output of this is written locally to JSON file called `projects.json` and as well as attemping to write to a Github gist if the correct token and gist Id is provided. Intended to be run on a schedule using Heroku.

## Installation
1. Clone the repository
2. run `npm install` to get the dependancies.
3. run `npm start` to begin fetching the data.
> Coingecko has an API rate limit of 300 calls/minute so the requests are throttled. 