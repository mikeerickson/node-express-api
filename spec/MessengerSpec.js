// var msg    = require('../tasks/console');
var msg    = require('gulp-messenger');
var expect = require('chai').expect;

describe("gulp-messenger module", function() {

  it("should test all message routines", function(done) {
    // msg.Log('log');
    msg.Info('info');
    msg.Error('error');
    msg.Success('success');
    msg.Warning('warning');
    msg.Note('note');
    msg.Time('time');
    // msg.Debug('debug');
    // msg.warn('warn');
    expect(true).to.be.equal(true);

    done();
  });

});
