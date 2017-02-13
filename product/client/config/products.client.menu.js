/*'use strict';
angular.module('products').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Products', 'products', 'dropdown', '/products(/create)?');
		Menus.addSubMenuItem('topbar', 'products', 'List Products', 'products');
		Menus.addSubMenuItem('topbar', 'products', 'New Product', 'products/create');
	}
]);*/

(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Products',
      state: 'products',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'products', {
      title: 'List Product',
      state: 'products.list',
      roles: ['*']
    });

     // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'products', {
      title: 'New Product',
      state: 'products.create',
      roles: ['*']
    });

  }
}());
