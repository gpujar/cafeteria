'use strict';

/**
 * Module dependencies
 */
var carte = require('../controllers/carte.server.controller');

module.exports = function (app) {
  // Carte collection routes
  app.route('/api/carte')
    .get(carte.list)
    .post(carte.create);

  // Single item routes
  app.route('/api/carte/:carteId')
    .get(carte.read)
    .put(carte.update)
    .delete(carte.delete);

    // Single item routes
  app.route('/api/menu')
    .get(carte.read);


  // Finish by binding the carte middleware
  app.param('carteId', carte.carteByID);
};
