'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Boat = mongoose.model('Boat'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var boat = new Boat(req.body);
  boat.user = req.user;
  boat.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boat);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var boat = req.boat ? req.boat.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  boat.isCurrentUserOwner = !!(req.user && boat.user && boat.user._id.toString() === req.user._id.toString());

  res.json(boat);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var boat = req.boat;

  boat.title = req.body.title;
  boat.content = req.body.content;

  boat.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boat);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var boat = req.boat;

  boat.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boat);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Boat.find().sort('-created').populate('user', 'displayName').exec(function (err, boat) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(boat);
    }
  });
};

/**
 * boat middleware
 */
exports.boatByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'boat is invalid'
    });
  }

  Boat.findById(id).populate('user', 'displayName').exec(function (err, boat) {
    if (err) {
      return next(err);
    } else if (!boat) {
      return res.status(404).send({
        message: 'No boat with that identifier has been found'
      });
    }
    req.boat = boat;
    next();
  });
};
