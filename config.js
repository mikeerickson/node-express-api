// APPLICATION CONFIGURATION
// global, application wide configuration (./tasks/connfig is for tasks configuration only)

"use strict";

module.exports = {

  defaults: {
    src:             ['/**/*.js'],
    appName:         'MLB Player Stats',
    rateLimit:       250,
    rateBufferDelay: 60,
    recLimit:        10000,
    connection:      'mongodb://localhost:27017/players',
    port:            3000
  },

  dev: {
    src:         ['/**/*.js'],
    connection:  'mongodb://localhost:27017/players',
    port:        3000,
    apikey:      'gunner',
    checkApiKey: true
  },

  production: {
    connection: 'mongodb://localhost:27017/players',
    port: 3000
  }

};
