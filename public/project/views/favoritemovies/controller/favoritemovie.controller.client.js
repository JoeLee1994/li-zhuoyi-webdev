/**
 * Created by Joe on 2017/6/27.
 */
(function () {
    angular
        .module('Project')
        .controller('favoritemovieController', favoritemovieController);

    function favoritemovieController(currentUser, $location, userService, movieService) {
        var model = this;
        var i;

        model.userId = currentUser._id;
        // model.likemovie = likemovie;
        // model.unlikemovie = unlikemovie;
        // model.queryLiking = queryLiking;
        model.logout = logout;
        model.movies = [];



        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    console.log(user);
                    model.likedmovies = user.likedmovies;
                    console.log(model.likedmovies);
                    if(model.likedmovies.length === 0){
                        model.message = "You have no favorite movies.";
                    } else{
                            for(var i=0; i < model.likedmovies.length; i++) {
                                movieService
                                    .findMovieById(model.likedmovies[i])
                                    .then(function (foundmovie) {
                                        model.movies.push(foundmovie);
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