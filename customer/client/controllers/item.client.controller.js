(function () {
  'use strict';

  angular
    .module('customer')
    .controller('CustomerAdminController', CustomerAdminController);

  CustomerAdminController.$inject = ['$scope', '$state', '$window', 'carteResolve', 'Authentication'];

  function CustomerAdminController($scope, $state, $window, carteResolve, Authentication) {
    var vm = this;

    vm.carte = carteResolve;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.carte.$remove($state.go('admin.articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.carte.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('carte.list'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
