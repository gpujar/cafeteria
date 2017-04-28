(function () {
  'use strict';

  angular
    .module('customer.services')
    .factory('CustomerService', CustomerService);

  CustomerService.$inject = ['$resource'];

  function CustomerService($resource) {
    var Carte = $resource('api/carte/:carteId', {
      carteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Carte.prototype, {
      createOrUpdate: function () {
        var carte = this;
        return createOrUpdate(carte);
      }
    });

    return Carte;

    function createOrUpdate(carte) {
      if (carte._id) {
        return carte.$update(onSuccess, onError);
      } else {
        return carte.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(carte) {
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
