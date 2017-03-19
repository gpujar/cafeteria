(function () {
  'use strict';

  angular
    .module('carte')
    .controller('CarteController', CarteController);

  CarteController.$inject = ['$scope', 'carteResolve', 'Authentication', 'CarteService'];

  function CarteController($scope, carteResolve, Authentication, CarteService) {
    var vm = this;
    vm.carte = carteResolve;
    vm.days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
    vm.categories = ['breakfast','lunch','snacks'];
    vm.authentication = Authentication;
    vm.error = null;

    vm.selected = function (selectedDay, selectedCategory) {
      CarteService.query({
      day: selectedDay || getDay(),
      category: selectedCategory || getType(),
    }, onSuccess, onError).$promise;
    }

    function getDay() {
      return 'monday';
    }

    function getType() {
      return 'snacks';
    }

    // Handle successful response
      function onSuccess(carte) {
         vm.carte = carte;
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
      }
  }
}());
