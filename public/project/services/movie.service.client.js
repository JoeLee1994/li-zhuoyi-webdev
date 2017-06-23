/**
 * Created by Joe on 2017/6/23.
 */
(function () {
    angular
        .module('Project')
        .factory('movieService', movieService);

    function movieService($http) {


        var api = {
            findMovieById: findMovieById,
            findAlllikedMovies: findAlllikedMovies,
            updateMovie: updateMovie
        };
        return api;

        function findMovieById(movieId) {
            var url = "/api/project/movie/" + movieId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAlllikedMovies() {
            var url = "/api/project/movies";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateMovie(movieId, movie) {
            var url = "/api/project/movie/" + movieId;
            return $http
                .put(url, movie)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();

