/**
 * Created by Joe on 2017/6/20.
 */
(function () {
    angular
        .module('Project')
        .factory('movieService', movieService);

    function movieService($http) {

        var api = {
            searchCinemaByName: searchCinemaByName,
            searchMovieByCinema: searchMovieByCinema
        };
        return api;

        function searchCinemaByName(name) {
            var url = "https://api.internationalshowtimes.com/v4/cinemas/" + name.replace(/\s+/g, "-") + "/?apikey=WOeF9mNfP1CyUU1tnF1eimGhfX1aQkup";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data.cinema.id;
                })
        }

        function searchMovieByCinema(id) {
            var url = "https://api.internationalshowtimes.com/v4/movies/?cinema_id=" + id + "&apikey=WOeF9mNfP1CyUU1tnF1eimGhfX1aQkup";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();