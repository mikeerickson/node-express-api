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
var Team  = require('../app/models/team');
var User    = require('../app/models/user');

// DESCRIBE SCENARIOS
// =============================================================================
describe('team: testing', function(done) {
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
    it("should create new team", function(done) {
      var team = new Team(seedData);
      team.HR = 199;
      team.save(function(err, team) {
        if (err) { msg.Error(err); return done(err); }
        expect(team).to.be.an('object');
        expect(team.HR).to.be.equal(199);
      });
      done();
    });

    // read
    it("should read team information", function(done) {

      var team = new Team(seedData);
      team.save(function(err, team){
        if (err) { msg.error(err); return done(err); }
          var q = Team.find({teamID: 'LAA'}).limit(1);
          q.exec(function(err, teams) {
            if (err) { msg.error(err); return done(err); }
            expect(teams.length).to.be.equal(1);
            assert(teams);
            expect(teams[0].G).to.be.equal(162);
          });
      });

      done();
    });

    // update
    it("shold update team data", function(done) {

      var team = new Team(getSeedData());
      team.save(function(err, team){
        if (err) { msg.error(err); return done(err); }
          Team.find(/erickson/i, function(err, data){
          if(err){ msg.error(err); }
          var team = data[0];
          team.HR = '2020';
          team.save(function(err){
            if(err){ msg.error(err); }
            expect(team.HR).to.not.be.equal(1010);
            team.HR.should.not.equal(1010);
          });
        });
      });

      done();

    });

    // delate
    it("should delete a team", function(done) {

      Team.remove({last_name: 'Ericson'}, function(err){
      if (err) { msg.error(err); return done(err); }
      });
      done();
    });

    it("can clear the DB on demand", function(done) {

      new Team(getSeedData()).save(function(err, model) {
        if (err) { msg.error(err); return done(err); }
        clearDB(function(err) {
        if (err) { return done(err); }
          Team.find({}, function(err, docs) {
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
      var team = new Team();    // create a new instance of the Team model

      team.set(data);
      team.validate(function(err) {
        if(err) { msg.error(err); }
        team.save(function(err, team) {
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

    it("should return team data", function(done) {

      // create temp team, will be deleted below
      var team = new Team(getSeedData());
      team.save(function(err, team){
        if (err) { msg.error(err); }
          Team.find({teamID: 'LAA'}, function(err, data){
          if (err) { msg.error(err); }
          var team = data[0];
          expect(team.HR).to.be.equal(190);
        });

      });

      done();

    });

    it("should delete specific record, using alternate technique", function(done) {

      Team.remove({last_name: /erickson/i}, function(err) {
        if (err) { msg.error(err); }
        // msg.success('Team Removed');
      });

      done();
    });

  });

});

// SUPPORT FUNCTIONS
// =============================================================================

// seed Team data
function getSeedData() {

  var data = {
    teamID:     'LAA',
    lgID:       'LA',
    yearID:     '2014',
    divID:      'AL',
    G:          162,
    HR:         190
  };
  return data;
}

function createTestUser() {
  var user = new User({user: 'Mike Erickson', apikey: '1234'});
  user.save(function(err){
  });
}
