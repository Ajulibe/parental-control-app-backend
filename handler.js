'use strict';
const { application } = require('./app');
const serverless = require('serverless-http');

module.exports.hello = serverless(application);
