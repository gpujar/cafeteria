(function () {
  'use strict';

  angular
    .module('customer')
    .controller('CustomerListController', CustomerListController);

  CustomerListController.$inject = ['CarteService'];

  function CustomerListController(CarteService) {
    var vm = this;

    vm.carte = CarteService.query();
  }
}());
