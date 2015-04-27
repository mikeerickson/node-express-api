'use strict';

var should  = require('should');
var chai    = require('chai');
var winston = require('winston');
var mkdirp  = require('mkdirp');

// CONFIGURE LOGGER
// =============================================================================
var options = {
  filename:    'spec/logs/batter-test.log',
  silent:      false,
  timestamp:   true,
  prettyPrint: true
};

mkdirp('spec/logs', function (err) {
    if (err) { winston.error(err); }
});

winston.add(winston.transports.DailyRotateFile, options)
winston.remove(winston.transports.Console); // suppress console output


// LOAD MODELSE
// =============================================================================
var Batter  = require('../app/models/batter');


// DESCRIBE SCENARIOS
// =============================================================================
describe('batter: testing', function(done) {
  winston.info('test');
  // this section will be executed BEFORE each test
  beforeEach(function() {
    winston.info('this is a winston log, where does it arrive');
    this.options = {};
  });

  // this section will be executed AFTER each test
  afterEach(function(){
  });

  it("should succeed", function() {
    winston.info('should succeed');
    expect('True').toBe('True');
  });

  it("should succeed", function() {
    winston.info('shoud succeed');
    expect('False').toBe('False');
  });

  it("should return an error when missing objects are not supplied", function(done) {

    var data   = getSeedData();
    var batter = new Batter();    // create a new instance of the Batter model

    batter.set(data);
    batter.validate(function(err) {
      if(err) { winston.error(err) };
      batter.save(function(err, batter) {
        if(err) { winston.error(err); }
      });
    });
    done();
  });

  it("should delete a collection of documents", function(done) {

    Batter.find({ last_name : "erickson"}, function (err, batter, done) {
      if (err) { winston.error(err); }
        batter.remove(function (err) {
            if(err) { winston.error(err); }
            winston.success('removed');
        });
      });
      done();
    });

  it("should delete a collection of documents again", function() {
    Batter.find({ last_name: "erickson" }).remove().exec();
  });

});

// SUPPORT FUNCTIONS
// =============================================================================

// seed Batter data
function getSeedData() {

  var data = {
    first_name: 'Mike',
    last_name:  'erickson',
    teamID:     'LAA',
    lgID:       'LA',
    yearID:     '2014'
  };

  data.playerID = data.last_name.toLowerCase() + data.first_name.substring(0,3).toLowerCase() + data.yearID;

  return data;

}