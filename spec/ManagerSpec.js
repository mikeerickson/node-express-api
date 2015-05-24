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
var Manager  = require('../app/models/manager');
var User    = require('../app/models/user');

// DESCRIBE SCENARIOS
// =============================================================================
describe('manager: testing', function(done) {
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
    it("should create new manager", function(done) {
      var manager = new Manager(seedData);
      manager.last_name = 'ericson';
      manager.save(function(err, manager) {
        if (err) { msg.Error(err); return done(err); }
        expect(manager).to.be.an('object');
        expect(manager.last_name).to.be.equal('ericson');
      });
      done();
    });

    // read
    it("should read manager information", function(done) {

      var manager = new Manager(seedData);
      manager.save(function(err, manager){
        if (err) { msg.error(err); return done(err); }
          var q = Manager.find({last_name: 'erickson'}).limit(1);
          q.exec(function(err, managers) {
            if (err) { msg.error(err); return done(err); }
            expect(managers.length).to.be.equal(1);
            assert(managers);
            expect(managers[0].last_name).to.be.equal('erickson');
          });
      });

      done();
    });

    // update
    it("shold update manager data", function(done) {

      var manager = new Manager(getSeedData());
      manager.save(function(err, manager){
        if (err) { msg.error(err); return done(err); }
          Manager.find(/erickson/i, function(err, data){
          if(err){ msg.error(err); }
          var manager = data[0];
          manager.W = 99;
          manager.L = 63;
          manager.save(function(err){
            if(err){ msg.error(err); }
            expect(manager.W).to.not.be.equal(98);
            manager.W.should.not.equal(98);
          });
        });
      });

      done();

    });

    // delate
    it("should delete a manager", function(done) {

      Manager.remove({last_name: 'Ericson'}, function(err){
      if (err) { msg.error(err); return done(err); }
      });
      done();
    });

    it("can clear the DB on demand", function(done) {

      new Manager(getSeedData()).save(function(err, model) {
        if (err) { msg.error(err); return done(err); }
        clearDB(function(err) {
        if (err) { return done(err); }
          Manager.find({}, function(err, docs) {
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
      var manager = new Manager();    // create a new instance of the Manager model

      manager.set(data);
      manager.validate(function(err) {
        if(err) { msg.error(err); }
        manager.save(function(err, manager) {
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

    it("should return manager data", function(done) {

      // create temp manager, will be deleted below
      var manager = new Manager(getSeedData());
      manager.save(function(err, manager){
        if (err) { msg.error(err); }
          Manager.find({last_name: 'erickson'}, function(err, data){
          if (err) { msg.error(err); }
          var manager = data[0];
          expect(manager.last_name).to.be.equal('erickson');
        });

      });

      done();

    });

    it("should delete specific record, using alternate technique", function(done) {

      Manager.remove({last_name: /erickson/i}, function(err) {
        if (err) { msg.error(err); }
        // msg.success('Manager Removed');
      });

      done();
    });

  });

});

// SUPPORT FUNCTIONS
// =============================================================================

// seed Manager data
function getSeedData() {

  var data = {
    first_name: 'Mike',
    last_name:  'erickson',
    teamID:     'LAA',
    lgID:       'LA',
    yearID:     '2014',
    W:          98,
    L:          64
  };
  data.playerID = data.last_name.toLowerCase() + data.first_name.substring(0,3).toLowerCase() + data.yearID;
  return data;
}

function createTestUser() {
  var user = new User({user: 'Mike Erickson', apikey: '1234'});
  user.save(function(err){
  });
}
