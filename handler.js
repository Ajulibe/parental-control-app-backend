'use strict';
const { application } = require('./src/app');
const serverless = require('serverless-http');

module.exports.hello = serverless(application);
