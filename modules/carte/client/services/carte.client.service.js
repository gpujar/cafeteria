(function () {
  'use strict';

  angular
    .module('carte.services')
    .factory('CarteService', CarteService);

  CarteService.$inject = ['$resource'];

  function CarteService($resource) {
    var Carte = $resource('api/items/:itemId', {
      itemId: '@_id'
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
      console.log("Giri :: carte._id  "+carte._id);
      console.trace();
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
