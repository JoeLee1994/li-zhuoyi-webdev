/**
 * Created by Joe on 2017/6/13.
 */
(function () {
    angular
        .module('Project')
        .controller('showtimeController', showtimeController);

    function showtimeController() {
        var model = this;

        model.searchByMovieandLocation = searchByMovieandLocation;
        model.searchByTitle = searchByTitle;


        function searchByMovieandLocation(movieId, location) {
            showtimeService
                .searchByMovieandLocation(movieId, location)
                .then(renderShowtime)
        }

        function renderShowtime(response) {
            model.showtime = response;
        }

        function searchByTitle(title) {
            showtimeService
                .searchByTitle(title)
                .then(renderMovies);

            function renderMovies(response) {
                model.movies = response.Search;
            }
        }
    }
}());