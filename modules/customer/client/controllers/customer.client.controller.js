(function () {
  'use strict';

  angular
    .module('customer')
    .controller('CustomerController', CustomerController);

  CustomerController.$inject = ['$scope', 'carteResolve', 'Authentication'];

  function CustomerController($scope, carte, Authentication) {
    var vm = this;
    vm.carte = carte;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
