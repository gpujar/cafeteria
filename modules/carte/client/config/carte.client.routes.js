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
        resolve: {
          carteResolve: newCarteCreate
        },
        data: {
          pageTitle: 'Carte List'
        }
      })
      .state('carte.view', {
        url: '/view',
        templateUrl: 'modules/carte/client/views/view-carte.client.view.html',
        controller: 'CarteController',
        controllerAs: 'vm',
        resolve: {
          carteResolve: getDayCarte
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
        url: '/:itemId',
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
      itemId: $stateParams.itemId
    }).$promise;
  }

  function getDayCarte($stateParams, CarteService) {
    return CarteService.query({
      day: $stateParams.day || getDay(),
      category: $stateParams.category || getCategory()
    }).$promise;
  }

  function getDay() {
    return 'monday';
  }

  function getCategory() {
    return 'lunch';
  }

  newCarte.$inject = ['CarteService'];
  function newCarte(CarteService) {
    return new CarteService();
  }

  newCarteCreate.$inject = ['CarteCreateService'];
  function newCarteCreate(CarteCreateService) {
    return new CarteCreateService();
  }

}());
