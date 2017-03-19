(function () {
  'use strict';

  angular
    .module('carte.services')
    .factory('CarteCreateService', CarteCreateService);

  CarteCreateService.$inject = ['$resource'];

  function CarteCreateService($resource) {
    var Carte = $resource('api/items', {
      itemId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

     angular.extend(Carte.prototype, {
      queryData: function () {
      var carte =  CarteCreateService.query({
      day: 'monday'
    }).$promise;
        return carte;
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
