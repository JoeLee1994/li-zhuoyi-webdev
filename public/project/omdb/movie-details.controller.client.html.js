/**
 * Created by Joe on 2017/6/21.
 */
(function () {
    angular
        .module('Project')
        .controller('movieDetailsController', movieDetailsController);


    function movieDetailsController(omdbService, $routeParams, currentUser, userService, movieService, reviewService) {

        var model = this;

        model.imdbID = $routeParams['movieId'];
        model.userId = currentUser._id;
        model.amIliking = false;
        model.message = false;

        model.likemovie = likemovie;
        model.unlikemovie = unlikemovie;
        model.queryLiking = queryLiking;
        model.writereview = writereview;
        // model.getMovieId = getMovieId;



        function writereview(reviewcontent) {
            movieService
                .findMovieByImdbID(model.imdbID)
                .then(function (foundmovie) {
                    if(foundmovie){
                        if(currentUser){
                            var review = {
                                reviewer: currentUser._id,
                                movie: foundmovie._id,
                                content: reviewcontent
                            };
                            console.log(review);
                            reviewService
                                .createReview(review)
                                .then(function () {
                                    model.message = true;
                                })
                        } else {
                            alert("You have not logged in");
                        }
                    } else {
                        omdbService
                            .searchMovieByImdbID(model.imdbID)
                            .then(function (foundmovie) {
                            return movieService
                                       .createMovie(foundmovie)
                                .then(function (createdmovie) {
                                    if(currentUser){
                                        var review = {
                                            reviewer: currentUser._id,
                                            movie: createdmovie._id,
                                            content: reviewcontent
                                        };
                                        console.log(review);
                                        reviewService
                                            .createReview(review)
                                            .then(function () {
                                                model.message = true;
                                            })
                                    } else {
                                        alert("You have not logged in");
                                    }
                                })
                        })
                    }
                })
        }

        // function writereview(reviewcontent) {
        //     console.log(getMovieId)
        //     getMovieId(model.imdbID)
        //         .then(function (movie) {
        //             if(currentUser){
        //                 var review = {
        //                     reviewer: currentUser._id,
        //                     movie: movie._id,
        //                     content: reviewcontent
        //                 };
        //                 console.log(review);
        //                 reviewService
        //                     .createReview(review)
        //             } else {
        //                 alert("You have not logged in");
        //             }
        //         })
        // }


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

        function queryLiking(response) {
            if(currentUser){
                movieService.findMovieByImdbID(response.imdbID)
                    .then(function(found){
                        if(found._id){
                            var index = currentUser.likedmovies.indexOf(found._id);
                            if(index > -1){
                                model.amIliking = true;
                                return;
                            }else{
                                model.amIliking = false;
                                return;
                            }
                        }else{
                            model.amIliking = false;
                            return;
                        }
                    })
            } else {
                model.amIliking = false;
                return;
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
                                    // .then(function () {
                                    //     movieService
                                    //         .findMovieById(foundmovie._id)
                                    //     // .then(function (movie) {
                                    //     //     var index1 = movie.likedbyuser.indexOf(currentUser._id);
                                    //     //     if (index1 === -1) {
                                    //     //         console.log(movie.likedbyuser);
                                    //     //         movie.likedbyuser.push(currentUser._id);
                                    //     //         console.log(movie.likedbyuser);
                                    //     //         movieService
                                    //     //             .updateMovie(movie._id, movie);
                                    //     //     }
                                    //     // });
                                    // });
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
            movieService
                .findMovieByImdbID(movie.imdbID)
                .then(function (foundmovie) {
                console.log(foundmovie._id);
                console.log(currentUser);
                var index = currentUser.likedmovies.indexOf(foundmovie._id);
                if (index !== -1) {
                    currentUser.likedmovies.splice(index, 1);
                    userService
                        .updateUser(currentUser._id, currentUser)
                }
            })

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
})();