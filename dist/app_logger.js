"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_native_1 = require("request-promise-native");
const logger_1 = require("./logger");
const config_1 = require("./config");
const _ = require('lodash');
let instance = 'none';
class AppLogger {
    static getInstance() {
        const options = {
            method: 'GET',
            uri: config_1.default.settings.aws_instance_id_url,
            timeout: 2000,
        };
        return request_promise_native_1.default(options)
            .then((res) => {
            instance = res;
            return true;
        })
            .catch((error) => {
            console.log(`failed to get instance-id:${error}`);
            return true;
        });
    }
    static loggerCast(val, type) {
        let ret;
        switch (type) {
            case 'int':
                ret = parseInt(val, 10);
                return isNaN(ret) ? 0 : ret;
            case 'obj':
                ret = _.isObject(val);
                return ret ? val : { obj: val };
            case 'str':
                ret = `${val}`;
                return ret;
            default:
                return val;
        }
    }
    static info(_msg, _topic, _subTopic, _appLevel, _userId = 0, _roomId = 0, _extraObj = {}, _err = null, _req = null, _url = '', _resSource = null) {
        const msg = AppLogger.loggerCast(_msg, 'str');
        const topic = AppLogger.loggerCast(_topic, 'str');
        const subTopic = AppLogger.loggerCast(_subTopic, 'str');
        const appLevel = AppLogger.loggerCast(_appLevel, 'int');
        const userId = AppLogger.loggerCast(_userId, 'str');
        const roomId = AppLogger.loggerCast(_roomId, 'str');
        const extraObj = AppLogger.loggerCast(_extraObj, 'obj');
        const err = AppLogger.loggerCast(_err, 'obj');
        const req = AppLogger.loggerCast(_req, 'obj');
        const url = AppLogger.loggerCast(_url, 'str');
        const res = AppLogger.loggerCast(_resSource, 'obj');
        logger_1.default.info({ app: config_1.default.app, env: config_1.default.env, mode: config_1.default.run_mode, topic, subTopic, appLevel, userId, roomId, extraObj, err, instance, memory: process.memoryUsage(), req, url, res }, msg);
    }
    static error(_msg, _topic, _subTopic, _appLevel, _userId = 0, _roomId = 0, _extraObj = {}, _err = null, _req = null, _url = '', _resSource = null) {
        const msg = AppLogger.loggerCast(_msg, 'str');
        const topic = AppLogger.loggerCast(_topic, 'str');
        const subTopic = AppLogger.loggerCast(_subTopic, 'str');
        const appLevel = AppLogger.loggerCast(_appLevel, 'int');
        const userId = AppLogger.loggerCast(_userId, 'str');
        const roomId = AppLogger.loggerCast(_roomId, 'str');
        const extraObj = AppLogger.loggerCast(_extraObj, 'obj');
        const err = AppLogger.loggerCast(_err, 'obj');
        const req = AppLogger.loggerCast(_req, 'obj');
        const url = AppLogger.loggerCast(_url, 'str');
        const res = AppLogger.loggerCast(_resSource, 'obj');
        logger_1.default.error({ app: config_1.default.app, env: config_1.default.env, mode: config_1.default.run_mode, topic, subTopic, appLevel, userId, roomId, extraObj, err, instance, memory: process.memoryUsage(), req, url, res }, msg);
    }
    static log(msg, topic, owner, appLevel = 0, userId = 0, roomId = 0, extraObj = false, err = null, url = '') {
        let ucTopic = topic.toUpperCase();
        let subTopic = '';
        const extraObject = extraObj === false ? {} : extraObj;
        if (ucTopic.indexOf('|') > 0) {
            const topicSplit = ucTopic.split('|');
            ucTopic = topicSplit[0];
            subTopic = topicSplit[1];
        }
        if (err != null) {
            AppLogger.error(msg, ucTopic, subTopic, appLevel, userId, roomId, extraObject, err, null, url);
        }
        else {
            AppLogger.info(msg, ucTopic, subTopic, appLevel, userId, roomId, extraObject, err, null, url);
        }
    }
}
exports.default = AppLogger;
//# sourceMappingURL=app_logger.js.map