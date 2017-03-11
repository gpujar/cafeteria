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
        url: '?day',
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
    console.log("Giri :: $stateParams.itemId "+$stateParams.itemId);
    console.trace();
    return CarteService.get({
      itemId: $stateParams.itemId
    }).$promise;
  }

  function getDayCarte($stateParams, CarteService) {
    console.log("Giri :: $stateParams.day "+$stateParams.day);
    console.trace();
    return CarteService.query({
      day: $stateParams.day || getDay()
    }).$promise;
  }

  function getDay() {
    return 'monday';
  }

  newCarte.$inject = ['CarteService'];

  function newCarte(CarteService) {
    return new CarteService();
  }

}());
