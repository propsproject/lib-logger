"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const config_1 = require("./config");
const bugsnag = require('bugsnag');
if (config_1.default.settings.bugsnag_enabled === true) {
    bugsnag.register(config_1.default.settings.bugsnag_api, { releaseStage: config_1.default.settings.bugsnag_release_stage });
}
let sharedLogger = null;
exports.default = sharedLogger;
const env = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'development';
if (!sharedLogger) {
    let loggerName;
    try {
        loggerName = config_1.default.settings.microservice.name;
    }
    catch (e) {
        loggerName = 'micro-service';
    }
    exports.default = sharedLogger = bunyan.createLogger({
        name: loggerName,
        streams: [
            { stream: process.stdout, level: 'debug' },
        ],
        serializers: {
            req: bunyan.stdSerializers.req,
        },
    });
    process.on('unhandledRejection', (reason, promise) => {
        sharedLogger.error({ env: config_1.default.env, topic: 'SERVER_ERRORS', owner: 'core-env', applevel: 2, msg: `unhandledRejection at promise: ${promise.toString()} reason:${reason}` });
        if (config_1.default.settings.bugsnag_enabled === true) {
            bugsnag.notify(reason);
        }
    });
    process.on('uncaughtException', (err) => {
        sharedLogger.error({ env: config_1.default.env, topic: 'SERVER_ERRORS', owner: 'core-env', applevel: 1, err, msg: `uncaughtException ${err.message}` });
        if (config_1.default.settings.bugsnag_enabled === true) {
            bugsnag.notify(err);
        }
    });
}
//# sourceMappingURL=logger.js.map