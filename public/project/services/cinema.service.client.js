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
            createCinema: createCinema,
            searchCinemaByIdFromAPI: searchCinemaByIdFromAPI
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

        function searchCinemaByIdFromAPI(id) {
            var url = "https://api.internationalshowtimes.com/v4/cinemas/" + id + "/?apikey=WOeF9mNfP1CyUU1tnF1eimGhfX1aQkup";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();