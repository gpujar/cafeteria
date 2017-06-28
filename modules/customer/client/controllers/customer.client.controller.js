(function () {
  'use strict';

  angular
    .module('customer')
    .controller('CustomerController', CustomerController);

  CustomerController.$inject = ['$scope', 'CustomerService', 'Authentication'];

  function CustomerController($scope, CustomerService, Authentication) {
    var vm = this;
    vm.carte = CustomerService;
    vm.authentication = Authentication;
    vm.error = null;
    vm.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    vm.categories = ['breakfast', 'lunch', 'snacks'];

    function getDay() {
      return 'monday';
    }

    function getType() {
      return 'snacks';
    }

    vm.setOption = function(day, category){
      vm.selectedDay = day;
      vm.selectedCategory = category;
    }

    vm.submitdata= function (data) {
      vm.carte.save({day:vm.selectedDay,category:vm.selectedCategory},onSuccess, onError);
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

