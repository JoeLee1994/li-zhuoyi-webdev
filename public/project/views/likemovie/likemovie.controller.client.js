/**
 * Created by Joe on 2017/6/23.
 */
(function () {
    angular
        .module('Project')
        .controller('likemovieController', likemovieController);
    
    function likemovieController($routeParams, $location, currentUser, userService, movieService) {
        var model = this;

        model.userId = currentUser._id;
        model.likemovie = likemovie;
        model.unlikemovie = unlikemovie;
        model.amIliking = amIliking;
        model.logout = logout;

        function init() {
            userService
                .findAlllikedMovies(model.userId)
                .then(function (likedmovies) {
                console.log(likedmovies);
                model.likedmovies = likedmovies;
                if (likedmovies.length === 0) {
                    model.message = "You have no liked movies.";
                }
            });
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function amIliking(otherUserId) {
            return currentUser.likedmovies.indexOf(otherUserId) > -1;
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