/**
 * Created by Joe on 2017/6/7.
 */
(function () {
    angular
        .module('Project')
        .controller('omdbController', omdbController);

    function omdbController(omdbService) {

        var model = this;

        model.searchByTitle = searchByTitle;
        model.searchMovieByImdbID = searchMovieByImdbID;


        function searchMovieByImdbID(imdbID) {
            omdbService
                .searchMovieByImdbID(imdbID)
                .then(renderMovieDetails);

            function renderMovieDetails(response) {
                model.movie = response;
            }
        }

        function searchByTitle(title) {
            omdbService
                .searchByTitle(title)
                .then(renderMovies);

            function renderMovies(response) {
                model.movies = response.Search;
            }
        }
    }
})();