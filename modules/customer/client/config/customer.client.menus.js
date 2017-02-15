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
    menuService.addSubMenuItem('topbar', 'customer', {
      title: 'List Customer',
      state: 'customer.list',
      roles: ['user']
    });
  }
}());
