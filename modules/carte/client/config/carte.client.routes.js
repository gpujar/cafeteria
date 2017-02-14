(function () {
  'use strict';

  angular
    .module('carte.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('carte', {
        abstract: true,
        url: '/carte',
        template: '<ui-view/>'
      })
      .state('carte.list', {
        url: '',
        templateUrl: 'modules/carte/client/views/list-carte.client.view.html',
        controller: 'CarteListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Carte List'
        }
      })
      .state('carte.view', {
        url: '/:carteId',
        templateUrl: 'modules/carte/client/views/view-carte.client.view.html',
        controller: 'CarteController',
        controllerAs: 'vm',
        resolve: {
          carteResolve: getCarte
        },
        data: {
          pageTitle: 'Carte {{ articleResolve.title }}'
        }
      }).state('carte.create', {
        url: '/create',
        templateUrl: 'modules/carte/client/views/form-carte.client.view.html',
        controller: 'CarteAdminController',
        controllerAs: 'vm',
        resolve: {
          carteResolve: newCarte
        }
      })
      .state('carte.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/carte/client/views/form-carte.client.view.html',
        controller: 'CarteAdminController',
        controllerAs: 'vm',
        resolve: {
          carteResolve: getCarte
        }
      });
  }

  getCarte.$inject = ['$stateParams', 'CarteService'];

  function getCarte($stateParams, CarteService) {
    return CarteService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newCarte.$inject = ['CarteService'];

  function newCarte(CarteService) {
    return new CarteService();
  }

}());
