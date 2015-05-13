var msg    = require('../tasks/console');
var expect = require('chai').expect;

describe("Console Module", function() {

  it("should test all message routines", function() {
    msg.log('log');
    msg.info('info');
    msg.error('error');
    msg.success('success');
    msg.warning('warning');
    msg.warn('warn');
    expect(true).to.be.equal(true);
  });

});
