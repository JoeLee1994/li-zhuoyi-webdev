/**
 * Created by Joe on 2017/6/21.
 */
(function () {
    angular
        .module('Project')
        .controller('movieController', movieController);

    function movieController(movieService) {
        var model = this;

        model.searchCinemaByName = searchCinemaByName;
        model.searchMovieByCinema = searchMovieByCinema;

        function searchCinemaByName(name) {
            movieService
                .searchCinemaByName(name)
                .then(searchMovieByCinema);
        }

        function searchMovieByCinema(id) {
            movieService
                .searchMovieByCinema(id)
                .then(renderMovieDetails);
        }

        function renderMovieDetails(response) {
            model.movie = response.movies;
        }
    }
})();
