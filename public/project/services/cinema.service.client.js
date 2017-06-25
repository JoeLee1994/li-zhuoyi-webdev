/**
 * Created by Joe on 2017/6/25.
 */
/**
 * Created by Joe on 2017/6/25.
 */
(function () {
    angular
        .module('Project')
        .factory('cinemaService', cinemaService);

    function cinemaService($http) {

        var api = {
            findCinemaById: findCinemaById,
            findAlllikedCinemas: findAlllikedCinemas,
            findCinemaByOwnID: findCinemaByOwnID,
            createCinema: createCinema
        };
        return api;

        function findCinemaById(cinemaId) {
            var url = "/api/project/cinemas/" + cinemaId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAlllikedCinemas() {
            var url = "/api/project/cinemas";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findCinemaByOwnID(id) {
            var url = "/api/project/cinemasByOwnId/" + id;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createCinema(cinema) {
            var url = "/api/project/cinema";
            return $http
                .post(url, cinema)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();