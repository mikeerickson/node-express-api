'use strict';

var should   = require('should');
var chai     = require('chai');
var assert   = require('chai').assert;
var expect   = require('chai').expect;
var msg      = require('../tasks/console');
var mongoose = require('../app/core/db.js');

// LOAD MODELSE
// =============================================================================
var Batter  = require('../app/models/batter');
var User = require('../app/models/user');


// DESCRIBE SCENARIOS
// =============================================================================
describe('batter: testing', function(done) {
  // this section will be executed BEFORE each test
  beforeEach(function() {
    this.options = {};
  });

  describe("should perform standard CRUD operations", function(done) {

    var seedData  = getSeedData();
    var last_name = 'ericson';

    beforeEach(function() {
      this.options = {};
    });

    // create
    it("should create new batter", function() {
      var batter = new Batter(seedData);
      batter.last_name = 'ericson';
      batter.save(function(err, batter) {
        expect(batter).to.be.an('object');
        expect(batter.last_name).to.be.equal('ericson');
      });
    });

    // read
    it("should read batter information", function() {

      var q = Batter.find({last_name: 'Trout'}).limit(1);
      q.exec(function(err, batters) {
        if(err){ msg.error(err); }
        expect(batters.length).to.be.equal(1);
        assert(batters);
        expect(batters[0].last_name).to.be.equal('Trout');
      });

    });

    // update
    it("shold update batter data", function() {
      Batter.find(/trout/i, function(err, data){
        if(err){ msg.error(err); }
        var batter = data[0];
        batter.HR = batter.HR;
        batter.save(function(err){
          if(err){ msg.error(err); }
          assert(batter);
        });
      });
    });

    // delate
    it("should delete a batter", function() {
      Batter.remove({last_name: 'Ericson'}, function(err){
        if(err){ msg.error(err); }

      });
    });

  });

  describe("should perform some other random tests", function() {

    it("should pass simple test to confirm this thing is", function() {
      expect(true).to.equal(true);
    });

    it("should return an error when missing objects are not supplied", function(done) {

      var data   = getSeedData();
      var batter = new Batter();    // create a new instance of the Batter model

      batter.set(data);
      batter.validate(function(err) {
        if(err) { msg.error(err) };
        batter.save(function(err, batter) {
          if(err) { msg.error(err); }
        });
      });
      done();
    });

    it("should test the User.findByApiKey routine", function() {
      var apikey = '1234';
      User.findByApiKey(apikey, function(err, data){
        if(err){ msg.error(err); }
        expect(data[0].apikey).to.be.equal(apikey);
      });

    });

    it("should return batter data", function(done) {

      // create temp batter, will be deleted below
      var batter = new Batter(getSeedData());
      batter.save(function(err, batter){
        if (err) { msg.error(err); }
      });

      Batter.find({last_name: 'erickson'}, function(err, data){
        if (err) { msg.error(err); }
        var batter = data[0];
        expect(batter.last_name).to.be.equal('erickson');
      });

      done();

    });

    it("should delete specific record, using alternate technique", function(done) {

      Batter.remove({last_name: /erickson/i}, function(err) {
        if (err) { msg.error(err); }
        // msg.success('Batter Removed');
      });

      done();
    });

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

function createBatter()
{
  var data = getSeedData();

  var batter = new Batter(data);
  batter.save(function(err, batter){
    if (err) { msg.error(err); }

    msg.success('Batter Created Successfully');
  })
}