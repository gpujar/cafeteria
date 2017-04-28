(function () {
  'use strict';

  angular
    .module('customer.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('customer', {
        abstract: true,
        url: '/customer',
        template: '<ui-view/>'
      })
      .state('customer.list', {
        url: '',
        templateUrl: 'modules/customer/client/views/list-customer.client.view.html',
        controller: 'CustomerListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Customer List'
        }
      })
      .state('customer.view', {
        url: '/:customerId',
        templateUrl: 'modules/customer/client/views/view-customer.client.view.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: getArticle
        },
        data: {
          pageTitle: 'Customer {{ articleResolve.title }}'
        }
      }).state('customer.create', {
        url: '/create',
        templateUrl: 'modules/customer/client/views/form-customer.client.view.html',
        controller: 'CustomerAdminController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: newArticle
        }
      })
      .state('customer.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/customer/client/views/form-customer.client.view.html',
        controller: 'CustomerAdminController',
        controllerAs: 'vm',
        resolve: {
          customerResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'CustomerService'];

  function getArticle($stateParams, CustomerService) {
    return CustomerService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['CustomerService'];

  function newArticle(CustomerService) {
    return new CustomerService();
  }

}());
