"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const props_lib_env_1 = require("props-lib-env");
const index_1 = require("./settings/index");
const config = new props_lib_env_1.Config();
exports.default = config;
config.merge([props_lib_env_1.settings, index_1.default]);
//# sourceMappingURL=config.js.map