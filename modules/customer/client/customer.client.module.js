(function (app) {
  'use strict';

  app.registerModule('customer', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
//  app.registerModule('articles.admin', ['core.admin']);
//  app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('customer.services');
  app.registerModule('customer.routes', ['ui.router', 'core.routes', 'customer.services']);
}(ApplicationConfiguration));
