# Building a RESTful API with Node, MongoDB and Express

Sample Node Express API application, using Express 4.0 Router and simple API router.
Example application will allow you to work with a single endpoint `batters` which contains all batting data for MLB 2014!

## Requirements

- Node MongDB, npm, and nodemon*

* If you dont use Nodemon (which you should), you just need to edit the package.json start script to call `node server.js`

## Installation
Complete the following tasks if getting started (you can skip step 3 if you want to have a clean database)

1. Clone the repo:
	- <pre>https://github.com/mikeerickson/node-express-api.git</pre>
2. Install application dependencies
	- <pre>npm install</pre>
3. Import `batters.json` sample data
	- <pre>$ mongoimport -d players -c batters --file batters.json</pre>
	- <pre>$ mongoimport -d players -c pitchers --file pitchers.json</pre>
4. Start MongoDB server daemon
	- <pre>$ mongod</pre>
5. Start the server
	- <pre>$ npm start</pre>*

## Mongo Shell
If you want to work with the `players` database using Mongo Shell, use separate tab

<pre> $ mongo players </pre>

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)

## Change History

20140331 - 0.2.0:
- Added `players` endpoint
- Refactored code to place routes in separate `routes` directory
- Added `apikey` authentication

20140326 - 0.1.0:
- Initial Release (basic API)

## Contributing
Contributions are welcome, you know the drill :-)

## Credits

node-express-api written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.org](http://codedungeon.org)


