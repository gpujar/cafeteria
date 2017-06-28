(function () {
  'use strict';

  angular
    .module('customer')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Customer',
      state: 'customer',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'customer', {
    //   title: 'QR Code Reader',
    //   state: 'customer.list',
    //   roles: ['user']
    // });

     // Add the dropdown list item to notification
    menuService.addSubMenuItem('topbar', 'customer', {
      title: 'Notification',
      state: 'customer.notify',
      roles: ['user']
    });
  }
}());
