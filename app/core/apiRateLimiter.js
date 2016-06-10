'use strict';

var defaults = require('defaults');
var msg      = require('gulp-messenger');
var config   = require('../../config');

function RateLimit(options) {

    var hits = {};

    // window, delay, and max apply per-ip
    options = defaults(options, {
        bufferDelay: config.defaults.rateBufferDelay * 1000 || 6000, // milliseconds - how to to wait before rate limit buffer is cleared
        maxHits:     config.defaults.rateLimit || 100                // number of visits before sending 429
    });

    return function rateLimit(req, res, next) {

        var ip = req.ip;
        if (typeof hits[ip] !== "number") {
          hits[ip] = 0;
        } else {
          hits[ip]++;
        }

        // reset counter for current IP address after delay has elapsed
        setTimeout(function() {
            hits[ip] = 0;
        }, options.bufferDelay);

        if (hits[ip] >= options.maxHits) {
            msg.Error('Rate Limit Exceeed: ' + ip);
            return res.status(429).json({'status': 'Fail', message: 'Rate Limit Exceeded'});
        }
        // carry on with out bad self
        next();
    };
}

module.exports = RateLimit;
