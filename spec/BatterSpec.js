'use strict';

var dbURI      = 'mongodb://localhost:27017/players-test';

var mongoose = require('mongoose');
var should   = require('should');
var assert   = require('chai').assert;
var expect   = require('chai').expect;

var msg      = require('../tasks/console');
var clearDB  = require('mocha-mongoose')(dbURI);
var chalk    = require('chalk');


// LOAD MODELSE
// =============================================================================
var Batter  = require('../app/models/batter');
var User    = require('../app/models/user');

// DESCRIBE SCENARIOS
// =============================================================================
describe('batter: testing', function(done) {
  // this section will be executed BEFORE each test
  beforeEach(function(done) {
    this.options = {};
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  afterEach(function(done){ done(); });

  describe("should perform standard CRUD operations", function(done) {

    var seedData  = getSeedData();
    var last_name = 'ericson';

    beforeEach(function() {
      this.options = {};
    });

    // create
    it("should create new batter", function(done) {
      var batter = new Batter(seedData);
      batter.last_name = 'ericson';
      batter.save(function(err, batter) {
        if (err) { msg.error(err); return done(err); }
        expect(batter).to.be.an('object');
        expect(batter.last_name).to.be.equal('ericson');
      });
      done();
    });

    // read
    it("should read batter information", function(done) {

      var q = Batter.find({last_name: 'Trout'}).limit(1);
      q.exec(function(err, batters) {
        if (err) { msg.error(err); return done(err); }
        expect(batters.length).to.be.equal(1);
        assert(batters);
        expect(batters[0].last_name).to.be.equal('Trout');
      });
      done();
    });

    // update
    it("shold update batter data", function(done) {

      var batter = new Batter(getSeedData());
      batter.save(function(err, batter){
        if (err) { msg.error(err); return done(err); }
          Batter.find(/erickson/i, function(err, data){
          if(err){ msg.error(err); }
          var batter = data[0];
          batter.HR = '36';
          batter.save(function(err){
            if(err){ msg.error(err); }
            expect(batter.HR).to.not.be.equal(29);
            batter.HR.should.not.equal(29);
          });
        });
      });

      done();

    });

    // delate
    it("should delete a batter", function(done) {

      Batter.remove({last_name: 'Ericson'}, function(err){
      if (err) { msg.error(err); return done(err); }
      });
      done();
    });

    it("can clear the DB on demand", function(done) {

      new Batter(getSeedData()).save(function(err, model) {
        if (err) { msg.error(err); return done(err); }
        clearDB(function(err) {
        if (err) { return done(err); }
          Batter.find({}, function(err, docs) {
            if (err) { msg.error(err); return done(err); }
            docs.length.should.equal(0);
            done();
          });
        });
      });
    });

  });

  describe("should perform some other random tests", function() {

    beforeEach(function(done) {
      createTestUser();
      done();
    });

    it("should pass simple test to confirm this thing is", function() {
      expect(true).to.equal(true);
    });

    it("should return an error when missing objects are not supplied", function(done) {

      var data   = getSeedData();
      var batter = new Batter();    // create a new instance of the Batter model

      batter.set(data);
      batter.validate(function(err) {
        if(err) { msg.error(err); }
        batter.save(function(err, batter) {
          if(err) { msg.error(err); }
        });
      });
      done();
    });

    it("should test the User.findByApiKey routine", function(done) {
      new User({apikey: '1234'}, function(err) {
        User.findByApiKey('1234', function(err, data){
          if(err){ msg.error(err); }
          expect(data[0].apikey).to.be.a('String');
        });
      });
      done();
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
    yearID:     '2014',
    HR:         29
  };
  data.playerID = data.last_name.toLowerCase() + data.first_name.substring(0,3).toLowerCase() + data.yearID;
  return data;
}

function createTestUser() {
  var user = new User({user: 'Mike Erickson', apikey: '1234'});
  user.save(function(err){
  });
}