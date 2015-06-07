'use strict';

var config = require('../config');
var http   = require('unirest');
var msg    = require('gulp-messenger');

var should = require('should');
var chai   = require('chai');
var assert = require('chai').assert;
var expect = require('chai').expect;

xdescribe('myApi testing', function () {

  // this section will be executed BEFORE each test
  beforeEach(function () {
    this.options = {
      url: 'http://localhost:3000/api/v1',
      id: '5511b9ab6379da8d0b749fcd',
      headers: {
        'apikey': 'gunner',
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
  });

  // this section will be executed AFTER each test
  afterEach(function () {
  });

  it("GET should contain response to home route", function (done) {
    http.get(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send()
      .end(function (response) {
        expect(response.body.status).to.be.equal('OK');
        expect(response.body.message).to.be.equal('Welcome to MLB Player Stats 2014 API');
        done();
      });
  });

  it("POST should respond with authentication error message", function (done) {

    this.options.url = this.options.url + '/batters';
    http.post(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', '')
      .send(getSeedData())
      .end(function (response) {
        expect(response.body.status).to.be.equal('fail');
        expect(response.body.message).to.be.equal('Unauthorized -- Invalid ApiKey');
        done();
      });
  });

  it("GET should perform standard request", function (done) {
    this.options.url = this.options.url + '/batters?limit=1';
    http.get(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send()
      .end(function (response) {
        var batters = response.body;
        assert(batters);
        done();
      });
  });

  it("GET should perform standard request with :id", function (done) {
    var batterID = '5511b9ab6379da8d0b749fcd';
    this.options.url += '/batters/' + batterID;
    http.get(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send()
      .end(function (response) {
        var batter = response.body;
        expect(batter.first_name).to.be.equal('Mike');
        expect(batter.last_name).to.be.equal('Trout');
        done();
      });
  });

  it("HEAD should return HEAD object", function (done) {
    this.options.url += '/batters';
    http.head(this.options.url)
      .header('apikey', config.dev.apikey)
      .send()
      .end(function (response) {
        expect(response.status).to.be.equal(200);
        done();
      });
  });

  it("POST should create new resource", function (done) {
    this.options.url += '/batters';
    var batter = getSeedData();

    http.post(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send(batter)
      .end(function (response) {
        var success = {status: 'OK', message: 'Batter created'};
        expect(response.body.status).to.be.equal('OK');
        done();
      });
  });

  it("PUT should update an existing resource", function (done) {
    var batterID = '5511b9ab6379da8d0b749fcd';
    this.options.url += '/batters/' + batterID;
    var batter = {HR: 31};

    http.put(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send(batter)
      .end(function (response) {
        var success = {status: 'OK', message: 'Batter Updated'};
        expect(response.status).to.be.equal(200);
        expect(response.body.status).to.be.equal('OK');
        done();
      });
  });

  it("PATCH should update an existing resource", function (done) {
    var batterID = '5511b9ab6379da8d0b749fcd';
    this.options.url += '/batters/' + batterID;
    var batter = {HR: 29};

    http.patch(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send(batter)
      .end(function (response) {
        var success = {status: 'OK', message: 'Batter Updated'};
        expect(response.body.status).to.be.equal('OK');
        done();
      });
  });

  it("DELETE should delete an existing resource", function (done) {
    var batterID = '551cb130d7ce22b8a4000003';
    this.options.url += '/batters/' + batterID;

    http.delete(this.options.url)
      .header('Accept', 'application/json')
      .header('apikey', config.dev.apikey)
      .send()
      .end(function (response) {
        expect(response.body.status).to.be.equal('Fail');
        done();
      });
  });

});

function getSeedData() {

  var data = {
    first_name: 'kira',
    last_name: 'erickson',
    teamID: 'LAA',
    lgID: 'LA',
    yearID: '2014'
  };

  data.playerID = data.last_name.toLowerCase() + data.first_name.substring(0, 3).toLowerCase() + data.yearID;

  return data;

}
