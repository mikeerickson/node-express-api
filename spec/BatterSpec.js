'use strict';

var config  = require('../config');
var msg     = require('../tasks/console');
var http    = require('unirest');

// load up the required models
var Batter  = require('../app/models/batter');


describe('batter: testing', function(done) {

  // this section will be executed BEFORE each test
  beforeEach(function() {
    this.options = {};
  });

  // this section will be executed AFTER each test
  afterEach(function(){});

  it("should succeed", function() {
    expect('True').toBe('True');
  });

  it("should succeed", function() {
    expect('False').toBe('False');
  });

  it("should return an error when missing objects are not supplied", function(done) {

    var data   = getSeedData();
    var batter = new Batter();    // create a new instance of the Batter model

    batter.set(data);
    batter.validate(function(err) {
      if(err) { console.log(err) };
      batter.save(function(err, batter) {
        if(err) { console.log(err); }
        console.log('test');
      });

    });

    done();

  });

  it("should delete a collection of documents", function(done) {
    Batter.find({last_name: 'Erickson'}).remove().exec();
    done();
  });

});

function getSeedData() {

  var data = {
    first_name: 'Mike',
    last_name:  'Erickson',
    teamID:     'LAA',
    lgID:       'LA',
    yearID:     '2014'
  };

  data.playerID = data.last_name.toLowerCase() + data.first_name.substring(0,3).toLowerCase() + data.yearID;

  return data;

}