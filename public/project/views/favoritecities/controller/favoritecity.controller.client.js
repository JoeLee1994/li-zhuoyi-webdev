/**
 * Created by Joe on 2017/6/30.
 */
(function () {
    angular
        .module('Project')
        .controller('favoritecityController', favoritecityController);

    function favoritecityController(currentUser, $location, userService, cityService) {
        var model = this;
        var i;

        model.userId = currentUser._id;
        // model.likemovie = likemovie;
        // model.unlikemovie = unlikemovie;
        // model.queryLiking = queryLiking;
        model.logout = logout;
        model.cities = [];



        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user);
                    model.likedcities = user.likedcities;
                    console.log(model.likedcities);
                    if(model.likedcities.length === 0){
                        model.message = "You have no favorite cities.";
                    } else{
                        for(var i=0; i < model.likedcities.length; i++) {
                            cityService
                                .findCityById(model.likedcities[i])
                                .then(function (foundcity) {
                                    model.cities.push(foundcity);
                                });
                        }
                    }
                });
        }
        init();

        // function renderMovie(response) {
        //     console.log(response)
        //     model.movie = response.movie.Title;
        // }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();