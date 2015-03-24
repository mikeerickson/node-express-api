# Building a RESTful API with Node, MongoDB and Express

Using the new Express 4.0 Router to build an API

## Requirements

- Node MongDB, npm, and nodemon*

* If you dont use Nodemon (which you should), you just need to edit the package.json start script to call `node server.js`

## Installation
Complete the following tasks if getting started (you can skip step 3 if you want to have a clean database)

1. Clone the repo: `git clone https://github.com/mikeerickson/node-express-api.git`
2. Install dependencies: `npm install`
3. Import `batters.json` sample data
	- <pre>$ mongoimport -d players -c batters --file batters.json</pre>
4. Start MongoDB server daemon: `mongod`
5. Start the server: `node server.js`

## Mongo Shell
If you want to work with the `players` database using Mongo Shell, use separate tab

<pre> $ mongo players </pre>

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)
