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
        // model.searchMovieByCinema = searchMovieByCinema;
        model.queryLiking = queryLiking;
        //
        // model.searchCinemaByName = searchCinemaByName;


        // function searchCinemaByName(name) {
        //     movieService
        //         .searchCinemaByName(name)
        //         .then(searchMovieByCinema);
        // }

        
        function init() {
            searchMovieByCinema(model.id)
            cinemaService
                .searchCinemaByIdFromAPI(model.id)
                .then(function (foundcinema) {
                    model.cinema = foundcinema.cinema;
                    return foundcinema;
                })
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
            console.log(response);
            if(currentUser){
                cinemaService
                    .findCinemaByOwnID(response.cinema.id)
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

        function likecinema(cinema) {
            console.log(cinema);
            if (!currentUser._id) {
                alert("You have not logged in");
                return;
            } else {
                model.amIliking = true;
                console.log(cinema);
                cinemaService
                    .findCinemaByOwnID(cinema.id)
                    .then(function (foundcinema) {
                        console.log(foundcinema);
                        if (foundcinema) {
                            var index = currentUser.likedcinemas.indexOf(foundcinema._id);
                            if (index === -1) {
                                currentUser.likedcinemas.push(foundcinema._id);
                                console.log(currentUser.likedcinemas);
                                console.log(foundcinema._id);
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
                            cinemaService
                                .createCinema(cinema)
                                .then(function (createdcinema) {
                                    currentUser.likedcinemas.push(createdcinema._id);
                                    console.log(currentUser.likedcinemas);
                                    console.log(createdcinema._id);
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

        function unlikecinema(cinema) {
            model.amIliking = false;
            cinemaService
                .findCinemaByOwnID(cinema.id)
                .then(function (foundcinema) {
                    console.log(foundcinema._id);
                    console.log(currentUser);
                    var index = currentUser.likedcinemas.indexOf(foundcinema._id);
                    if (index !== -1) {
                        currentUser.likedcinemas.splice(index, 1);
                        userService
                            .updateUser(currentUser._id, currentUser)
                    }
                })
        }
    }
})();
