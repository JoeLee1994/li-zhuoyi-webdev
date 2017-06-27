/**
 * Created by Joe on 2017/6/21.
 */
(function () {
    angular
        .module('Project')
        .controller('movieController', movieController);

    function movieController(movieService, $routeParams, currentUser, userService, cinemaService) {
        var model = this;

        model.id = $routeParams['cinemaId'];
        model.userId = currentUser._id;
        model.amIliking = false;

        model.likecinema = likecinema;
        model.unlikecinema = unlikecinema;
        model.searchMovieByCinema = searchMovieByCinema;
        model.queryLiking = queryLiking;
        //
        // model.searchCinemaByName = searchCinemaByName;


        // function searchCinemaByName(name) {
        //     movieService
        //         .searchCinemaByName(name)
        //         .then(searchMovieByCinema);
        // }

        
        function init() {
            movieService
                .searchMovieByCinema(model.id)
                .findCinemaByOwnID(model.id)
                .then(queryLiking);
        }
        init();


        function searchMovieByCinema(id) {
            movieService
                .searchMovieByCinema(id)
                .then(renderMovieDetails);
        }

        function renderMovieDetails(response) {
             model.movie = response.movies;
        }

        function queryLiking(response) {
            if(currentUser){
                cinemaService
                    .findCinemaByOwnID(response.id)
                    .then(function(found){
                        if(found._id){
                            var index = currentUser.likedcinemas.indexOf(found._id);
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

        function likecinema(city) {
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

        function unlikecinema(id) {
            model.amIliking = false;
            cityService
                .findCityByOwnID(id)
                .then(function (foundcity) {
                    console.log(foundcity._id);
                    console.log(currentUser);
                    var index = currentUser.likedcities.indexOf(foundcity._id);
                    if (index !== -1) {
                        currentUser.likedcities.splice(index, 1);
                        userService
                            .updateUser(currentUser._id, currentUser)
                    }
                })
        }
    }
})();
