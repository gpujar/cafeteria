(function () {
  'use strict';

  angular
    .module('boat.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('boat', {
        abstract: true,
        url: '/boat',
        template: '<ui-view/>'
      })
      .state('boat.list', {
        url: '',
        templateUrl: 'modules/boat/client/views/list-boat.client.view.html',
        controller: 'BoatListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Boat List'
        }
      })
      .state('boat.view', {
        url: '/:boatId',
        templateUrl: 'modules/boat/client/views/view-boat.client.view.html',
        controller: 'BoatController',
        controllerAs: 'vm',
        resolve: {
          boatResolve: getArticle
        },
        data: {
          pageTitle: 'Boat {{ articleResolve.title }}'
        }
      }).state('boat.create', {
        url: '/create',
        templateUrl: 'modules/boat/client/views/form-boat.client.view.html',
        controller: 'BoatAdminController',
        controllerAs: 'vm',
        resolve: {
          boatResolve: newArticle
        }
      })
      .state('boat.edit', {
        url: '/:boatId/edit',
        templateUrl: 'modules/boat/client/views/form-boat.client.view.html',
        controller: 'BoatAdminController',
        controllerAs: 'vm',
        resolve: {
          boatResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'BoatService'];

  function getArticle($stateParams, BoatService) {
    return BoatService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['BoatService'];

  function newArticle(BoatService) {
    return new BoatService();
  }

}());
