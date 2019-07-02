import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';
import config from './config';

const bugsnag = require('bugsnag');

if (bugsnag.settings.bugsnag_enabled === true) {
  bugsnag.register(config.settings.bugsnag_api, {releaseStage: config.settings.bugsnag_release_stage});
}

let sharedLogger = null;

const env = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'development';

if (!sharedLogger) {
  let loggerName;
  try {
    loggerName = config.settings.microservice.name;
  } catch (e) {
    loggerName = 'micro-service';
  }
  sharedLogger = bunyan.createLogger({
    name: loggerName,
    streams: [
      { stream: process.stdout, level: 'debug' },
    ],
    serializers: {
      req: bunyan.stdSerializers.req,
    },
  });

  process.on('unhandledRejection', (reason, promise) => {
    sharedLogger.error({ env: config.env, topic: 'SERVER_ERRORS', owner: 'core-env', applevel: 2, msg: `unhandledRejection at promise: ${promise.toString()} reason:${reason}` });
    if (config.settings.bugsnag_enabled === true) {
      bugsnag.notify(reason);
    }
  });

  process.on('uncaughtException', (err) => {
    sharedLogger.error({ env: config.env, topic: 'SERVER_ERRORS', owner: 'core-env', applevel: 1, err, msg: `uncaughtException ${err.message}` });
    if (config.settings.bugsnag_enabled === true) {
      bugsnag.notify(err);
    }
  });
}

export { sharedLogger as default };
