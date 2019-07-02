import * as defaults from './settings.defaults';
import * as test from './settings.test';
import * as development from './settings.development';
import * as playground from './settings.playground';
import * as staging from './settings.staging';
import * as production from './settings.production';
import * as loadtest from './settings.loadtest';
import * as stagingK8s from './settings.staging_k8s';
import * as productionK8s from './settings.production_k8s';

const settings = {};
settings.defaults = defaults;
settings.test = test;
settings.development = development;
settings.playground = playground;
settings.staging = staging;
settings.production = production;
settings.loadtest = loadtest;
settings.staging_k8s = stagingK8s;
settings.production_k8s = productionK8s;

export { settings as default };
