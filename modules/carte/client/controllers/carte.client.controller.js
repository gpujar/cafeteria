(function () {
  'use strict';

  angular
    .module('carte')
    .controller('CarteController', CarteController);

  CarteController.$inject = ['$scope', 'carteResolve', 'Authentication', 'CarteService'];

  function CarteController($scope, carteResolve, Authentication, CarteService) {
    var vm = this;

    vm.carte = carteResolve;
    vm.days = ['monday','tuesday','wednesday','thursday','friday']
    vm.authentication = Authentication;
    vm.error = null;
    vm.selected = function (selectedDay) {
      CarteService.query({
      day: selectedDay || getDay()
    }, onSuccess, onError).$promise;
    }

    function getDay() {
      return 'monday';
    }

    // Handle successful response
      function onSuccess(carte) {
        console.log("On success ");
         vm.carte = carte;
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        console.log("On error ");
      }
  }
}());
