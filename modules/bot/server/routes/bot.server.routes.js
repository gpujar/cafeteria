'use strict';

/**
 * Module dependencies
 */
var bot = require('../controllers/bot.server.controller');

module.exports = function (app) {
  // Carte collection routes
  // app.route('/api/bot/count')
  //   .post(bot.count);
    //.post(bot.create);

  // // Single item routes
  // app.route('/api/carte/:carteId')
  //   .get(bot.read)
  //   .put(bot.update)
  //   .delete(bot.delete);

    app.route('/api/bot/menu')
    .post(bot.read);
    app.route('/api/bot/menu/notification')
    .post(bot.notify);
  // Finish by binding the carte middleware
  app.param('botId', bot.botByID);
};
