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
        model.amIliking = false;
        model.queryLiking = queryLiking;


        function init() {
            omdbService
                .searchMovieByImdbID(model.imdbID)
                .then(renderMovieDetails)
                .then(queryLiking);
        }
        init();

        function renderMovieDetails(response) {
                model.movie = response;
        }

        function queryLiking(movie) {
            console.log(movie);
            if(true){
                model.amIliking = true;
            } else {
                model.amIliking = false;
            }
        }

        // function amIliking(movie) {
        //     console.log(model.movie);
        //     movieService
        //         .findMovieByImdbID(movie.imdbID)
        //         .then(function (movie) {
        //             if(movie) {
        //                 return currentUser.likedmovies.indexOf(movieId) > -1;
        //             } else {
        //                 return false;
        //             }
        //         })
        // }

        function likemovie(movie) {
            console.log(movie);
            model.amIliking = true;
            movieService
                .findMovieByImdbID(movie.imdbID)
                .then(function (movie) {
                    if(movie) {
                        console.log(movie);
                        var index = currentUser.likedmovies.indexOf(movie.Id);
                        if(index === -1) {
                            currentUser.likedmovies.push(movieId);
                            console.log(currentUser.likedmovies);
                            console.log(movieId);
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
                    } else {
                        movieService
                            .createMovie(movie)
                            .then(function (movie) {
                                var index = currentUser.likedmovies.indexOf(movieId);
                                if(index === -1) {
                                    currentUser.likedmovies.push(movieId);
                                    console.log(currentUser.likedmovies);
                                    console.log(movieId);
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
                            })
                    }
                })
        }

        function unlikemovie(movieId) {
            model.amIliking = false;
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