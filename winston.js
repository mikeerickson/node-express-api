var winston = require('winston');
var chalk   = require('chalk');
var mkdirp  = require('mkdirp');

mkdirp('logs');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({ filename: 'logs/app.log', level: 'warn' })
    ]
});

logger.debug('debug');
logger.log('error',chalk.red('this is log'));
logger.info(chalk.blue('this is success'));
logger.info(chalk.green('this is info'));
logger.warn(chalk.magenta('this is warning'));
logger.error(chalk.red('this is error'));
