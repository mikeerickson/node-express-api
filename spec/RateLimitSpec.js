'use strict';

var config  = require('../config');
var http    = require('unirest');
var msg     = require('gulp-msg');

var should  = require('should');
var chai    = require('chai');
var assert  = require('chai').assert;
var expect  = require('chai').expect;

describe('rate limit testing', function() {

  // this section will be executed BEFORE each test
  beforeEach(function() {});

  // this section will be executed AFTER each test
  afterEach(function(){});

  // TODO: refactor this code so it uses promises to capture the final result
  it("GET Home Route", function(done) {

  	// TODO: figure out how to reset counter, max, etc
  	for (var i = 1; i <= 10; i++) {
  		sendRequest(i);
  	};

  	done();

  });

});

function sendRequest(index) {
	http.get('http://localhost:3000/api/v1')
	  .header('Accept', 'application/json')
	  .send()
	  .end(function (response) {
	    expect(response.body.status).to.be.equal('OK');
	    expect(response.body.message).to.be.equal('Welcome to MLB Player Stats 2014 API');
	  });
}
