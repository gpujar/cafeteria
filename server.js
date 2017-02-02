'use strict';
var logger = require('winston');

/**
 * Module dependencies.
 */

logger.debug('Debug things here');
logger.info('put info to track');
logger.error('to track error with status code');
var app = require('./config/lib/app');
var server = app.start();

