(function (app) {
  'use strict';

  app.registerModule('carte', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
//  app.registerModule('articles.admin', ['core.admin']);
//  app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('carte.services');
  app.registerModule('carte.routes', ['ui.router', 'core.routes', 'carte.services']);
}(ApplicationConfiguration));
