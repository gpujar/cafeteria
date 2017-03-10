'use strict';

/**
 * Module dependencies
 */
var item = require('../controllers/carte.server.controller');

module.exports = function (app) {

  app.route('/api/items')
    .get(item.get)
    .post(item.post);
  
  app.use('/api/items/:itemId',item.preId);

  app.route('/api/items/:itemId')
        .get(item.getId)
        .put(item.putId)
        .patch(item.patchId)
        .delete(item.deleteId);
};
