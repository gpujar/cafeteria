(function () {
  'use strict';

  angular
    .module('boat')
    .controller('BoatListController', BoatListController);

  BoatListController.$inject = ['BoatService'];

  function BoatListController(BoatService) {
    var vm = this;

    vm.boat = BoatService.query();
  }
}());
