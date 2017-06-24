/**
 * Created by Joe on 2017/6/21.
 */
(function () {
    angular
        .module('Project')
        .controller('movieDetailsController', movieDetailsController);


    function movieDetailsController(omdbService, $routeParams, currentUser, userService, movieService) {

        var model = this;

        model.imdbID = $routeParams['movieId'];
        model.userId = currentUser._id;
        model.likemovie = likemovie;
        model.unlikemovie = unlikemovie;
        model.amIliking = amIliking;


        function init() {
            omdbService
                .searchMovieByImdbID(model.imdbID)
                .then(renderMovieDetails);
        }
        init();

        function renderMovieDetails(response) {
                model.movie = response;
        }

        function amIliking(movieId) {
            return currentUser.likedmovies.indexOf(movieId) > -1;
        }

        function likemovie(movieId) {
            var index = currentUser.likedmovies.indexOf(movieId);
            if(index === -1) {
                currentUser.likedmovies.push(movieId);
                userService
                    .updateUser(currentUser._id, currentUser)
                    .then(function () {
                        movieService
                            .findMovieById(movieId)
                            .then(function (movie) {
                                var index1 = movie.likedbyuser.indexOf(currentUser._id);
                                if (index1 === -1) {
                                    console.log(movie.likedbyuser);
                                    movie.likedbyuser.push(currentUser._id);
                                    console.log(movie.likedbyuser);
                                    movieService
                                        .updateMovie(movieId, movie);
                                }
                            });
                    });
            }
        }

        function unlikemovie(movieId) {
            var index = currentUser.likedmovies.indexOf(movieId);
            if (index !== -1) {
                currentUser.likedmovies.splice(index, 1);
                userService
                    .updateUser(currentUser._id, currentUser)
                    .then(function () {
                        movieService
                            .findMovieById(movieId)
                            .then(function (movie) {
                                var index1 = movie.likedbyuser.indexOf(currentUser._id);
                                if (index1 !== 1) {
                                    movie.likedbyuser.splice(index1, 1);
                                    console.log(movie.likedbyuser);
                                    movieService
                                        .updateMovie(movieId, movie);
                                }
                            });
                    });
            }
        }
    }
})();