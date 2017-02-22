'use strict';

/**
 * Module dependencies
 */
var boat = require('../controllers/boat.server.controller');

module.exports = function (app) {
  // Carte collection routes
  app.route('/api/boat/count')
    .get(boat.count)
    .post(boat.create);

  // Single item routes
  app.route('/api/carte/:carteId')
    .get(boat.read)
    .put(boat.update)
    .delete(boat.delete);

    app.route('/api/boat/menu')
    .post(boat.read);
  // Finish by binding the carte middleware
  app.param('boatId', boat.boatByID);
};
