(function () {
  'use strict';

  angular
    .module('products.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.listProducts', {
        url: '',
        templateUrl: 'modules/products/views/list-products.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Product List'
        }
      })
      .state('products.createProduct', {
        url: '/create',
        templateUrl: 'modules/products/views/create-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: getProducts
        },
        data: {
          pageTitle: 'Products {{ productResolve.title }}'
        }
      }).state('products.viewProduct', {
        url: '/:productId',
        templateUrl: 'modules/products/views/view-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: newProduct
        }
      })
      .state('products.editProduct', {
        url: '/:productId/edit',
        templateUrl: 'modules/products/views/edit-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: getProducts
        }
      });
  }

  getProducts.$inject = ['$stateParams', 'ProductService'];

  function getArticle($stateParams, ProductService) {
    return ProductService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newProduct.$inject = ['ProductService'];

  function newProduct(ProductService) {
    return new ProductService();
  }

}());
