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
  var boatMenu = req.boat ? req.boat : {};
  boat.isCurrentUserOwner = !!(req.user && boat.user && boat.user._id.toString() === req.user._id.toString());
  Boat.find().sort('-created').populate('user', 'displayName').exec(function (err, boat) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var speech = '';
      console.log(boat); // Show the HTML for the Google homepage.
      speech = 'Todays MENU: \n\n';
      for (var myKey in boat) {
        console.log('key:' + myKey + ' value:' + boat.title);
        speech += boat.title;
        speech += '\n';
      }
      speech += '\nSelect a option:';
      speech += '\n';
      res.json({
        speech: speech,
        displayText: speech,
        source: 'apiai-webhook-sample'
      });
     // res.json(boat);
    }
  });
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
 * Traffic count
 */
exports.count = function (req, res) {
  // convert mongoose document to JSON
  var boat = req.boat ? req.boat.toJSON() : {};
  var boatMenu = req.boat ? req.boat : {};
  boat.isCurrentUserOwner = !!(req.user && boat.user && boat.user._id.toString() === req.user._id.toString());
  var request = require("request");
  var options = { method: 'GET',
  url: 'https://devnetapi.cisco.com/sandbox/mse/api/location/v2/clients/count',
  headers:
   { 'postman-token': '9988229e-9ae7-21e7-406d-612f5ad6949d',
     'cache-control': 'no-cache',
     authorization: 'Basic bGVhcm5pbmc6bGVhcm5pbmc=' } };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    var resp = JSON.parse(body);
    console.log('Giri :: '+resp.count);
    console.log('Giri :: '+resp.deviceType);
     res.json({
        speech: resp.count,
        displayText: resp.count,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Youngkitten.JPG/193px-Youngkitten.JPG",
        data: {"file": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Youngkitten.JPG/193px-Youngkitten.JPG"},
        source: 'spark'
      });
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
