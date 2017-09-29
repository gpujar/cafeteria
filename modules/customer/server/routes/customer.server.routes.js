'use strict';

/**
 * Module dependencies
 */
var customer = require('../controllers/customer.server.controller');

module.exports = function (app) {
  // Carte collection routes
  app.route('/api/customer')
    .get(customer.list)
    .post(customer.create);

  // Single item routes
  app.route('/api/customer/:customerId')
    .get(customer.read)
    .put(customer.update)
    .delete(customer.delete);

   // QR code image generation.
  app.route('/api/qrcode')
    .get(customer.createQRCode);

  // Finish by binding the carte middleware
  app.param('customerId', customer.customerByID);
};
