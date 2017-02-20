'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Carte = mongoose.model('Carte'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var carte = new Carte(req.body);
  carte.user = req.user;
  carte.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carte);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var carte = req.carte ? req.carte.toJSON() : {};
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
 // carte.isCurrentUserOwner = !!(req.user && carte.user && carte.user._id.toString() === req.user._id.toString());

  // res.json(carte);

  Carte.find().sort('-created').populate('user', 'displayName').exec(function (err, boat) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var speech = '';
      var images = {};
      console.log(boat); // Show the HTML for the Google homepage.
      speech = 'Todays MENU: \n\n';
       for (var myKey in boat) {
         console.log('key:'+myKey+'value:'+boat[myKey].title);
         speech += boat[myKey].title;
         speech += '\n';
         // if (boat.hasOwnProperty(imageURL)) {
         //   images[myKey] = boat[myKey].imageUrl;
         // }
       }
      speech += '\nSelect a option:';
      speech += '\n';
      res.json({
        speech: speech,
        displayText: speech,
        files:['https://s32.postimg.org/rpyc8dukl/9d33d767dfb02e809b83a51605d53c08.jpg'],
        source: 'apiai-webhook-sample'
      });
    }
  });

};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var carte = req.carte;

  carte.title = req.body.title;
  carte.content = req.body.content;

  carte.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carte);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var carte = req.carte;

  carte.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carte);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Carte.find().sort('-created').populate('user', 'displayName').exec(function (err, carte) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(carte);
    }
  });
};

/**
 * Carte middleware
 */
exports.carteByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Carte is invalid'
    });
  }

  Carte.findById(id).populate('user', 'displayName').exec(function (err, carte) {
    if (err) {
      return next(err);
    } else if (!carte) {
      return res.status(404).send({
        message: 'No carte with that identifier has been found'
      });
    }
    req.carte = carte;
    next();
  });
};
