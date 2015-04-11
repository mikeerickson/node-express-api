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
        }
      };

    case 'production':
      return {
        'http': {
          'port': 3000
        },
        'database': {
          'url': 'mongodb://localhost:27017/players'
        }
      };

    default:
      return {
         'http': {
          'port': 3000
        },
       'database': {
          'url': 'mongodb://localhost:27017/players'
        }
      };
  }
};

module.exports = new connection();