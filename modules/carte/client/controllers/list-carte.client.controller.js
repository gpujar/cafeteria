(function () {
  'use strict';

  angular
    .module('carte')
    .controller('CarteListController', CarteListController);

  CarteListController.$inject = ['CarteCreateService', 'carteResolve','$resource'];

  function CarteListController(CarteCreateService, carteResolve, $resource) {
    var vm = this;
    vm.service = CarteCreateService;
    vm.carte = vm.service.query();
    vm.selectedDay = '';
    vm.selectedCategory = '';
    vm.value ='';
    vm.days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
    vm.categories = ['breakfast','lunch','snacks'];
    vm.submitdata= function (data) {
      //const util = require('util');
      //console.log(util.inspect(data, {depth: null}));
      vm.service.update(data);
    }

     // Create a new article, or update the current instance
      function successCallback(res) {
        $state.go('carte.list'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    vm.setOption = function(day, category){
      vm.selectedDay = day;
      vm.selectedCategory = category;
    }

    vm.setValue =function(item){
      if(item.check){
        if(vm.selectedDay === 'Monday'){
            item.servedOnMonday = true;
        }else if(vm.selectedDay === 'Tuesday'){
             item.servedOnTuesday = true;
        }else if(vm.selectedDay === 'Wednesday'){
              item.servedOnWednesday = true;
        }else if(vm.selectedDay === 'Thursday'){
              item.servedOnThursday = true;
        }else if(vm.selectedDay === 'Friday'){
              item.servedOnFriday = true;
        }
      }else{
         if(vm.selectedDay === 'Monday'){
            item.servedOnMonday = false;
        }else if(vm.selectedDay === 'Tuesday'){
             item.servedOnTuesday = false;
        }else if(vm.selectedDay === 'Wednesday'){
              item.servedOnWednesday = false;
        }else if(vm.selectedDay === 'Thursday'){
              item.servedOnThursday = false;
        }else if(vm.selectedDay === 'Friday'){
              item.servedOnFriday = false;
        }
      }
      item.category = vm.selectedCategory;
      return item;
    }
  }
}());
