(function() {
    'use strict';
    var long;
    var lat;

    angular
        .module('controllers')
        .controller('stationsController', stationsController);

    function stationsController($http, $scope) {

        var vm = this;

        vm.newStation = {};

        vm.setCurrentStation = function(currentStation){
            if(currentStation != vm.currentStation){
                vm.currentStation = currentStation;
                long = (currentStation.geoLong);
                lat = (currentStation.geoLat);

                vm.map.center = {latitude: lat, longitude: long};
                vm.map.zoom = 15;
            }
                

            else {
                vm.currentStation = undefined;
                vm.centerMap(); 
            }
                
        };

        vm.addStation = function(){
            vm.allStations.push(
                {
                    name: vm.newStation.name,
                    type: vm.newStation.type
                }
            );

            vm.newStation = {};
        };

        $http.get('data/trainstations.json').then(function(trainstations) {
            vm.allStations = trainstations.data;
        });


        vm.centerMap = function() {
            vm.map = { center: { latitude: 52, longitude: 5.5 }, zoom: 7 };
        }

        vm.centerMap();
        





    }


})();