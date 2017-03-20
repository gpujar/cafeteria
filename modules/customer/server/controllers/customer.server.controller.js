'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Customer = mongoose.model('Customer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  qrImage = require('qr-image');
/**
 * Create an article
 */
exports.create = function (req, res) {
  var customer = new Customer(req.body);
  customer.user = req.user;
  customer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customer);
    }
  });
};

/**
 * Show the current customer
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var customer = req.customer ? req.customer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  customer.isCurrentUserOwner = !!(req.user && customer.user && customer.user._id.toString() === req.user._id.toString());

  res.json(customer);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var customer = req.customer;

  customer.title = req.body.title;
  customer.content = req.body.content;

  customer.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customer);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var customer = req.customer;

  customer.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customer);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Customer.find().sort('-created').populate('user', 'displayName').exec(function (err, customer) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(customer);
    }
  });
};

/**
 * customer middleware
 */
exports.customerByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'customer is invalid'
    });
  }

  Customer.findById(id).populate('user', 'displayName').exec(function (err, customer) {
    if (err) {
      return next(err);
    } else if (!customer) {
      return res.status(404).send({
        message: 'No customer with that identifier has been found'
      });
    }
    req.customer = customer;
    next();
  });
};

/*
 * It generates QR code to image in svg format.
 */
exports.createQRCode = function (req, res) {
  console.log('Log :: Barcode generation ');
  var code = qrImage.image('ThingQbator', { type: 'svg' });
  res.type('svg');
  code.pipe(res);
};
