'use strict';

var config  = require('../config');
var unirest = require('unirest');
var chalk   = require('chalk');

// create some quick variables
var error   = chalk.red;
var success = chalk.blue;
var info    = chalk.yellow;
var warning = chalk.magenta;

// utility debug wrapper
function debug(msg) { console.log(warning(msg)); }

// setup the test (this will be executed once)
beforeEach(function() {
    this.options = {};
});

describe('api testing', function() {

	// this section will be executed BEFORE each test
	beforeEach(function() {
		this.options = {
          url: 'http://localhost:3000/api/v1',
		  headers: {
 			'apikey': 'gunner',
 			'Accept': 'application/json',
 			'content-type': 'application/x-www-form-urlencoded'
		  }
		};
    });

	// this section will be executed AFTER each test
    afterEach(function(){});

	it("GET should respond with generic api response", function(done) {
		unirest.get(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send()
			.end(function (response) {
				expect(response.body.status).toBe('OK');
				expect(response.body.message).toBe('Welcome to MLB Player Stats 2014 API');
				done();
			});
	});

	it("GET should respond with authentication error message", function(done) {

		this.options.url = this.options.url + '/batters';
		unirest.get(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', '')
			.send()
			.end(function (response) {
				expect(response.body.status).toBe('fail');
				expect(response.body.message).toBe('Unauthorized -- Invalid ApiKey');
				done();
			});
	});

	it("GET should perform standard request", function(done) {
		this.options.url = this.options.url + '/batters';
		unirest.get(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send()
			.end(function (response) {
				var batter = response.body[0];
				expect(batter.first_name).toBe('Fernando');
				done();
			});
	});

	it("GET should perform standard request with :id", function(done) {
		var batterID = '5511b9ab6379da8d0b749fcd';
		this.options.url += '/batters/' + batterID;
		unirest.get(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send()
			.end(function (response) {
				var batter = response.body;
				expect(batter.first_name).toBe('Mike');
				expect(batter.last_name).toBe('Trout');
				done();
			});
	});

	it("POST should create new resource", function(done) {
		this.options.url += '/batters';
		var batter = {
			playerID: '00001234',
			yearID: '2014',
			lgID: 'AL',
			teamID: 'LAA',
			first_name: 'Kira',
			last_name: 'Erickson'
		};

		unirest.post(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send(batter)
			.end(function (response) {
				var success = { status: 'OK', message: 'Batter created' };
				expect(response.body.status).toBe('OK');
				done();
			});
	});

	it("PUT should update an existing resource", function(done) {
		var batterID = '5511b9ab6379da8d0b749fcd';
		this.options.url += '/batters/' + batterID;
		var batter = { HR: 31 };

		unirest.put(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send(batter)
			.end(function (response) {
				var success = { status: 'OK', message: 'Batter Updated' };
				expect(response.body.status).toBe('OK');
				done();
			});
	});

	it("PATCH should update an existing resource", function(done) {
		var batterID = '5511b9ab6379da8d0b749fcd';
		this.options.url += '/batters/' + batterID;
		var batter = { HR: 29 };

		unirest.patch(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send(batter)
			.end(function (response) {
				var success = { status: 'OK', message: 'Batter Updated' };
				expect(response.body.status).toBe('OK');
				done();
			});
	});

	it("DELETE should delete a resource", function(done) {
		var batterID = '551cb130d7ce22b8a4000003';
		this.options.url += '/batters/' + batterID;

		unirest.delete(this.options.url)
			.header('Accept', 'application/json')
			.header('apikey', config.dev.apikey)
			.send()
			.end(function (response) {
				expect(response.body.status).toBe('OK');
				done();
			});
	});
});

