/**
 * Created by Joe on 2017/6/13.
 */
(function () {
    angular
        .module('Project')
        .controller('showtimeController', showtimeController);

    function showtimeController(showtimeService, $location, $routeParams, currentUser, userService, cityService) {
        var model = this;

        model.id = $routeParams['cityId'];
        model.userId = currentUser._id;
        model.amIliking = false;

        model.likecity = likecity;
        model.unlikecity = unlikecity;
        model.queryLiking = queryLiking;
        model.searchCityByName = searchCityByName;
        model.searchCinemaByCity = searchCinemaByCity;
        model.searchMovieByCinema = searchMovieByCinema;

        function searchCityByName(name) {
            showtimeService
                .searchCityByName(name)
                .then(searchCinemaByCity);

        }

        // function renderCity(response) {
        //     model.city = response;
        // }

        function searchCinemaByCity(id) {
            showtimeService
                .searchCinemaByCity(id)
                .then(renderCinemaDetails);
        }

        function renderCinemaDetails(response) {
            model.cinema = response.cinemas;
        }

        function searchMovieByCinema(id) {
            $location.url('/moviesonshow/' + id);
        }

        function init() {
            cityService
                .findCityByOwnID(model.id)
                .then(queryLiking)
        }
        init();

        function queryLiking(response) {
            if (currentUser) {
                cityService
                    .findCityByOwnID(response.id)
                    .then(function (found) {
                        if (found._id) {
                            var index = currentUser.likedmovies.indexOf(found._id);
                            if (index > -1) {
                                model.amIliking = true;
                                return;
                            } else {
                                model.amIliking = false;
                                return;
                            }
                        } else {
                            model.amIliking = false;
                            return;
                        }
                    })
            } else {
                model.amIliking = false;
                return;
            }
        }

        function likecity(city) {
            console.log(city);
            if (!currentUser._id) {
                alert("You have not logged in");
                return;
            } else {
                model.amIliking = true;
                console.log(city);
                cityService
                    .findCityByOwnID(city.id)
                    .then(function (foundcity) {
                        console.log(foundcity);
                        if (foundcity) {
                            var index = currentUser.likedcities.indexOf(foundcity._id);
                            if (index === -1) {
                                currentUser.likedcities.push(foundcity._id);
                                console.log(currentUser.likedcities);
                                console.log(foundcity._id);
                                userService
                                    .updateUser(currentUser._id, currentUser)
                                    .then(function () {
                                        cityService
                                            .findCityById(foundcity._id)
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
                            cityService
                                .createCity(city)
                                .then(function (createdcity) {
                                    currentUser.likedcities.push(createdcity._id);
                                    console.log(currentUser.likedcities);
                                    console.log(createdcity._id);
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

        function unlikecity(city) {
            model.amIliking = false;
            cityService
                .findCityByOwnID(city.id)
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