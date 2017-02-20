'use strict';

/**
 * Module dependencies
 */
var boat = require('../controllers/boat.server.controller');

module.exports = function (app) {
  // Carte collection routes
  app.route('/api/boat')
    .get(boat.list)
    .post(boat.create);

  // Single item routes
  app.route('/api/carte/:carteId')
    .get(boat.read)
    .put(boat.update)
    .delete(boat.delete);

    app.route('/api/boat/menu')
    .get(boat.read);
  // Finish by binding the carte middleware
  app.param('boatId', boat.boatByID);
};
