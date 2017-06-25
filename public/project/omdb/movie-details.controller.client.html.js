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
              return model.movie = response;
        }

        function queryLiking(movie) {
            if(currentUser ){
                return;
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
            if (!currentUser._id) {
                alert("You have not logged in");
                return;
            } else {
                model.amIliking = true;
                console.log(movie);
                movieService
                    .findMovieByImdbID(movie.imdbID)
                    .then(function (foundmovie) {
                        console.log(foundmovie);
                        if (foundmovie) {
                            var index = currentUser.likedmovies.indexOf(foundmovie._id);
                            if (index === -1) {
                                currentUser.likedmovies.push(foundmovie._id);
                                console.log(currentUser.likedmovies);
                                console.log(foundmovie._id);
                                userService
                                    .updateUser(currentUser._id, currentUser)
                                    .then(function () {
                                        movieService
                                            .findMovieById(foundmovie._id)
                                        // .then(function (movie) {
                                        //     var index1 = movie.likedbyuser.indexOf(currentUser._id);
                                        //     if (index1 === -1) {
                                        //         console.log(movie.likedbyuser);
                                        //         movie.likedbyuser.push(currentUser._id);
                                        //         console.log(movie.likedbyuser);
                                        //         movieService
                                        //             .updateMovie(movie._id, movie);
                                        //     }
                                        // });
                                    });
                            }
                        } else {
                            movieService
                                .createMovie(movie)
                                .then(function (createdmovie) {
                                    currentUser.likedmovies.push(createdmovie._id);
                                    console.log(currentUser.likedmovies);
                                    console.log(createdmovie._id);
                                    userService
                                        .updateUser(currentUser._id, currentUser)
                                    // .then(function () {
                                    //     movieService
                                    //         .findMovieById(movie.movieId)
                                    //         .then(function (movie) {
                                    //             var index1 = movie.likedbyuser.indexOf(currentUser._id);
                                    //             if (index1 === -1) {
                                    //                 console.log(movie.likedbyuser);
                                    //                 movie.likedbyuser.push(currentUser._id);
                                    //                 console.log(movie.likedbyuser);
                                    //                 movieService
                                    //                     .updateMovie(movie.movieId, movie);
                                    //             }
                                    //         });
                                    // });
                                })
                        }
                    })
            }
        }

        function unlikemovie(movie) {
            model.amIliking = false;
            var index = currentUser.likedmovies.indexOf(movie._id);
            if (index !== -1) {
                currentUser.likedmovies.splice(index, 1);
                userService
                    .updateUser(currentUser._id, currentUser)
                    // .then(function () {
                    //     movieService
                    //         .findMovieById(movie._id)
                    //         .then(function (movie) {
                    //             var index1 = movie.likedbyuser.indexOf(currentUser._id);
                    //             if (index1 !== 1) {
                    //                 movie.likedbyuser.splice(index1, 1);
                    //                 console.log(movie.likedbyuser);
                    //                 movieService
                    //                     .updateMovie(movie._id, movie);
                    //             }
                    //         });
                    // });
            }
        }
    }
})();