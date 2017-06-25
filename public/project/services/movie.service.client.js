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
            updateMovie: updateMovie,
            findMovieByImdbID: findMovieByImdbID,
            createMovie: createMovie,
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

        function createMovie(movie) {
            var url = "/api/project/movie";
            return $http
                .post(url, movie)
                .then(function (response) {
                    return response.data;
                });
        }


        function findMovieByImdbID(imdbID) {
            var url = "/api/project/moviesByImdbId/" +imdbID;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

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


