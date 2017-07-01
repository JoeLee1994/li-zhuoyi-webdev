/**
 * Created by Joe on 2017/6/30.
 */
(function () {
    angular
        .module('Project')
        .controller('favoritecinemaController', favoritecinemaController);

    function favoritecinemaController(currentUser, $location, userService, cinemaService) {
        var model = this;
        var i;

        model.userId = currentUser._id;
        // model.likemovie = likemovie;
        // model.unlikemovie = unlikemovie;
        // model.queryLiking = queryLiking;
        model.logout = logout;
        model.cinemas = [];



        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user);
                    model.likedcinemas = user.likedcinemas;
                    console.log(model.likedcinemas);
                    if(model.likedcinemas.length === 0){
                        model.message = "You have no favorite cinema.";
                    } else{
                        for(var i=0; i < model.likedcinemas.length; i++) {
                            cinemaService
                                .findCinemaById(model.likedcinemas[i])
                                .then(function (foundcinema) {
                                    model.cinemas.push(foundcinema);
                                });
                        }
                    }
                });
        }
        init();

        function renderMovie(response) {
            console.log(response)
            model.movie = response.movie.Title;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();