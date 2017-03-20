(function () {
  'use strict';

  angular
    .module('carte')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Carte',
      state: 'carte',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'carte', {
      title: 'Create Menu',
      state: 'carte.list',
      roles: ['user']
    });

       // Display menu
    menuService.addSubMenuItem('topbar', 'carte', {
      title: 'View Menu',
      state: 'carte.view',
      roles: ['user']
    });

     // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'carte', {
      title: 'Add Item',
      state: 'carte.create',
      roles: ['user']
    });
  }
}());
