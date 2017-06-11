/**
 * Created by Joe on 2017/6/7.
 */
(function () {
    angular
        .module('Project')
        .factory('omdbService', omdbService);

    function omdbService($http) {

        var api = {
            searchMovieByImdbID:searchMovieByImdbID,
            searchByTitle:searchMovieByImdbID
        };
        return api;

        function searchMovieByImdbID(imdbID) {
            var url = "http://www.omdbapi.com/?apikey=dc8b1a5d&i=" + imdbID;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchByTitle(title) {
            var url = "http://www.omdbapi.com/?apikey=dc8b1a5d&s=" + title;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();