/**
 * Created by Joe on 2017/6/21.
 */
(function () {
    angular
        .module('Project')
        .controller('movieController', movieController);

    function movieController(movieService, $routeParams) {
        var model = this;

        model.id = $routeParams['cinemaId'];
        //
        // model.searchCinemaByName = searchCinemaByName;
        // model.searchMovieByCinema = searchMovieByCinema;

        // function searchCinemaByName(name) {
        //     movieService
        //         .searchCinemaByName(name)
        //         .then(searchMovieByCinema);
        // }

        
        function init() {
            movieService
                .searchMovieByCinema(model.id)
                .then(renderMovieDetails);
        }
        init();


        // function searchMovieByCinema(id) {
        //     movieService
        //         .searchMovieByCinema(id)
        //         .then(renderMovieDetails);
        // }

        function renderMovieDetails(response) {
            model.movie = response.movies;
        }
    }
})();
