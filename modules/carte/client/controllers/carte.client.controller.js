(function () {
  'use strict';

  angular
    .module('carte')
    .controller('CarteController', CarteController);

  CarteController.$inject = ['$scope', 'carteResolve', 'Authentication'];

  function CarteController($scope, carte, Authentication) {
    var vm = this;

    vm.carte = carte;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
