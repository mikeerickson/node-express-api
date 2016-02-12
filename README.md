# Building a RESTful API with Node, MongoDB and Express
### Including ApiAuthentication, ApiRateLimit, Mocha Test

Sample Node Express API application, using Express 4.0 Router and simple API router.

## Example Application Endpoints

Example application will allow you to work with a variety of endpoints including:

- `batters` which contains all batting data
- `pitchers` which contains all pitching data
- `teams` which contains all teams data
- `managers` which contains all manager data

## Requirements

- Node MongDB, npm, and nodemon*

* If you dont use Nodemon (which you should), you just need to edit the package.json start script to call `node server.js`

## Installation
Complete the following tasks if getting started (you can skip step 3 if you want to have a clean database)

1. Clone the repo:
	- <pre>https://github.com/mikeerickson/node-express-api.git</pre>
2. Install application dependencies
	- <pre>npm install</pre>
3. Import endpoint sample data (located in `seeds` directory)
	- <pre>$ mongoimport -d players -c batters --file seeds/batters.json </pre>
	- <pre>$ mongoimport -d players -c pitchers --file seeds/pitchers.json </pre>
	- <pre>$ mongoimport -d players -c managers --file seeds/managers.json </pre>
    - <pre>$ mongoimport -d players -c teams --file seeds/teams.json </pre>
4. Start MongoDB server daemon
	- <pre>$ mongod</pre>
5. Start the server
	- <pre>$ npm start</pre>

## Mongo Shell
If you want to work with the `players` database using Mongo Shell, use separate tab

<pre> $ mongo players </pre>

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

## Change History

2016.02.12 - 0.7.0
- Updated dependencies

2015.05.06 - 0.6.0
- Added Rate Limit Checking
- Added tests for all features
- Refactored ApiAuthentication module

2015.04.12 - 0.5.1
- Cleaned all the code to remove tabs (where applicable) replacing with spaces (indent level of 2).

2015.04.11 - 0.5.0
- Updated jasmine tasks to use Terminal Reporter

2015.04.03 - 0.4.0
- Added `teams` endpoint

2015.04.01 - 0.3.0:
- Added `managers` endpoint
- Added a complete API test suite
	<pre> $ npm test </pre>

2015.03.31 - 0.2.0:
- Added `pitchers` endpoint
- Refactored code to place routes in separate `routes` directory
- Added `apikey` authentication

2015.03.26 - 0.1.0:
- Initial Release (basic API)

## Contributing
Contributions are welcome, you know the drill :-)

## Credits

node-express-api written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.org](http://codedungeon.org)


