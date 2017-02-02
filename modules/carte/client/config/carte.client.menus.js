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
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'carte', {
      title: 'List Carte',
      state: 'carte.list',
      roles: ['*']
    });
  }
}());
