/**
 * Created by Joe on 2017/6/25.
 */
(function () {
    angular
        .module('Project')
        .factory('cityService', cityService);

    function cityService($http) {

        var api = {
            findCityById: findCityById,
            findAlllikedCities: findAlllikedCities,
            findCityByOwnID: findCityByOwnID,
            createCity: createCity
        };
        return api;

        function findCityById(cityId) {
            var url = "/api/project/cities/" + cityId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAlllikedCities() {
            var url = "/api/project/cities";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCityByOwnID(id) {
            var url = "/api/project/citiesByOwnId/" + id;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createCity(city) {
            var url = "/api/project/city";
            return $http
                .post(url, city)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();