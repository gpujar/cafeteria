(function () {
  'use strict';

  angular
    .module('carte')
    .controller('CarteListController', CarteListController);

  CarteListController.$inject = ['CarteService'];

  function CarteListController(CarteService) {
    var vm = this;

    vm.carte = CarteService.query();
  }
}());
