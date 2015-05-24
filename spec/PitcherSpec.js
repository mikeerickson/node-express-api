'use strict';

var dbURI      = 'mongodb://localhost:27017/players-test';

var mongoose = require('mongoose');
var should   = require('should');
var assert   = require('chai').assert;
var expect   = require('chai').expect;

var msg      = require('gulp-messenger');
var clearDB  = require('mocha-mongoose')(dbURI);
var chalk    = require('chalk');


// LOAD MODELSE
// =============================================================================
var Pitcher  = require('../app/models/pitcher');
var User    = require('../app/models/user');

// DESCRIBE SCENARIOS
// =============================================================================
describe('pitcher: testing', function(done) {
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
    it("should create new pitcher", function(done) {
      var pitcher = new Pitcher(seedData);
      pitcher.last_name = 'ericson';
      pitcher.save(function(err, pitcher) {
        if (err) { msg.Error(err); return done(err); }
        expect(pitcher).to.be.an('object');
        expect(pitcher.last_name).to.be.equal('ericson');
      });
      done();
    });

    // read
    it("should read pitcher information", function(done) {

      var pitcher = new Pitcher(seedData);
      pitcher.save(function(err, pitcher){
        if (err) { msg.error(err); return done(err); }
          var q = Pitcher.find({last_name: 'erickson'}).limit(1);
          q.exec(function(err, pitchers) {
            if (err) { msg.error(err); return done(err); }
            expect(pitchers.length).to.be.equal(1);
            assert(pitchers);
            expect(pitchers[0].last_name).to.be.equal('erickson');
          });
      });

      done();
    });

    // update
    it("shold update pitcher data", function(done) {

      var pitcher = new Pitcher(getSeedData());
      pitcher.save(function(err, pitcher){
        if (err) { msg.error(err); return done(err); }
          Pitcher.find(/erickson/i, function(err, data){
          if(err){ msg.error(err); }
          var pitcher = data[0];
          pitcher.SO = '136';
          pitcher.save(function(err){
            if(err){ msg.error(err); }
            expect(pitcher.SO).to.not.be.equal(29);
            pitcher.SO.should.not.equal(29);
          });
        });
      });

      done();

    });

    // delate
    it("should delete a pitcher", function(done) {

      Pitcher.remove({last_name: 'Ericson'}, function(err){
      if (err) { msg.error(err); return done(err); }
      });
      done();
    });

    it("can clear the DB on demand", function(done) {

      new Pitcher(getSeedData()).save(function(err, model) {
        if (err) { msg.error(err); return done(err); }
        clearDB(function(err) {
        if (err) { return done(err); }
          Pitcher.find({}, function(err, docs) {
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
      var pitcher = new Pitcher();    // create a new instance of the Pitcher model

      pitcher.set(data);
      pitcher.validate(function(err) {
        if(err) { msg.error(err); }
        pitcher.save(function(err, pitcher) {
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

    it("should return pitcher data", function(done) {

      // create temp pitcher, will be deleted below
      var pitcher = new Pitcher(getSeedData());
      pitcher.save(function(err, pitcher){
        if (err) { msg.error(err); }
          Pitcher.find({last_name: 'erickson'}, function(err, data){
          if (err) { msg.error(err); }
          var pitcher = data[0];
          expect(pitcher.last_name).to.be.equal('erickson');
        });

      });

      done();

    });

    it("should delete specific record, using alternate technique", function(done) {

      Pitcher.remove({last_name: /erickson/i}, function(err) {
        if (err) { msg.error(err); }
        // msg.success('Pitcher Removed');
      });

      done();
    });

  });

});

// SUPPORT FUNCTIONS
// =============================================================================

// seed Pitcher data
function getSeedData() {

  var data = {
    first_name: 'Mike',
    last_name:  'erickson',
    teamID:     'LAA',
    lgID:       'LA',
    yearID:     '2014',
    SO:         129
  };
  data.playerID = data.last_name.toLowerCase() + data.first_name.substring(0,3).toLowerCase() + data.yearID;
  return data;
}

function createTestUser() {
  var user = new User({user: 'Mike Erickson', apikey: '1234'});
  user.save(function(err){
  });
}
