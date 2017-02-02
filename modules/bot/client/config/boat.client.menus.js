(function () {
  'use strict';

  angular
    .module('boat')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Boat',
      state: 'boat',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'boat', {
      title: 'Boat',
      state: 'boat.list',
      roles: ['*']
    });
  }
}());
