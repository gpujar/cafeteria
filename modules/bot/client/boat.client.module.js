(function (app) {
  'use strict';

  app.registerModule('boat', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
//  app.registerModule('articles.admin', ['core.admin']);
//  app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('boat.services');
  app.registerModule('boat.routes', ['ui.router', 'core.routes', 'boat.services']);
}(ApplicationConfiguration));
