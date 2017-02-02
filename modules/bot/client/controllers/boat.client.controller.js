(function () {
  'use strict';

  angular
    .module('boat')
    .controller('BoatController', BoatController);

  BoatController.$inject = ['$scope', 'boatResolve', 'Authentication'];

  function BoatController($scope, carte, Authentication) {
    var vm = this;

    vm.carte = carte;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
