(function () {
  'use strict';

  angular
    .module('boat.services')
    .factory('BoatService', BoatService);

  BoatService.$inject = ['$resource'];

  function BoatService($resource) {
    var Boat = $resource('api/boat/:boatId', {
      boatId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Boat.prototype, {
      createOrUpdate: function () {
        var boat = this;
        return createOrUpdate(boat);
      }
    });

    return Boat;

    function createOrUpdate(boat) {
      if (boat._id) {
        return boat.$update(onSuccess, onError);
      } else {
        return boat.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(boat) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
