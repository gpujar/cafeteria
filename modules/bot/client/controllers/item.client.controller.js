(function () {
  'use strict';

  angular
    .module('boat')
    .controller('BoatAdminController', BoatAdminController);

  BoatAdminController.$inject = ['$scope', '$state', '$window', 'boatResolve', 'Authentication'];

  function BoatAdminController($scope, $state, $window, boatResolve, Authentication) {
    var vm = this;

    vm.boat = boatResolve;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.boat.$remove($state.go('admin.articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.boat.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('boat.list'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
