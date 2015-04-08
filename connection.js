'use strict';

var connection = function(){
  switch(process.env.NODE_ENV){
    case 'development':
    case 'dev':
      return {
        'http': {
          'port': 3000
        },
        'database': {
          'url': 'mongodb://localhost:27017/players'
        },
        'twilio': {
          'accountSid': '<ACCOUNT_SID>',
          'authToken': '<TOKEN>'
        }
      };

    case 'production':
      return {
        'http': {
          'port': 3000
        },
        'database': {
          'url': 'mongodb://localhost:27017/players'
        },
        'twilio': {
          'accountSid': '<ACCOUNT_SID>',
          'authToken': '<TOKEN>'
        }
      };

    default:
      return {
         'http': {
          'port': 3000
        },
       'database': {
          'url': 'mongodb://localhost:27017/players'
        },
        'twilio': {
          'accountSid': '<ACCOUNT_SID>',
          'authToken': '<TOKEN>'
        }
      };
  }
};

module.exports = new connection();