/**
 * Created by Joe on 2017/6/21.
 */
(function () {
    angular
        .module('Project')
        .controller('movieDetailsController', movieDetailsController);


    function movieDetailsController(omdbService, $routeParams) {

        var model = this;

        model.imdbID = $routeParams['movieId'];


        function init() {
            omdbService
                .searchMovieByImdbID(model.imdbID)
                .then(renderMovieDetails);
        }
        init();

            function renderMovieDetails(response) {
                model.movie = response;
            }

    }
})();