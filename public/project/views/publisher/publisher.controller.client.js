/**
 * Created by Joe on 2017/7/1.
 */
(function () {
    angular
        .module('Project')
        .controller('publisherController', publisherController);

    function publisherController(currentUser, userService, movieService, $location) {
        var model = this;
        model.list = [];

        model.logout = logout;


        function init() {
            movieService
                .findAlllikedMovies()
                .then(function (movies) {
                    userService
                        .findAllUsers()
                        .then(function (users) {
                            for (var i=0; i < movies.length; i++){
                                model.list[i] = movies[i];
                                model.list[i]['count'] = 0;
                                for (var c=0; c < users.length; c++) {
                                    console.log(movies[i], users[c])
                                    if(users[c].likedmovies.indexOf(movies[i]._id) >= 0){
                                        model.list[i]['count']++;
                                    }
                                }
                            }
                        })


                })
        }
        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }

})();