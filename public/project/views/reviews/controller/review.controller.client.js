/**
 * Created by Joe on 2017/6/30.
 */
(function () {
    angular
        .module('Project')
        .controller('reviewController', reviewController);

    function reviewController(currentUser, $location, reviewService) {
        var model = this;
        var i;

        model.userId = currentUser._id;
        model.logout = logout;
        model.reviews = [];
        
        function init() {
            reviewService
                .findAllReviews
                .then(function (reviews) {
                    for(var i=0, i < reviews.length, i++){
                        if(reviews[i] === model.userId) {
                            model.reviews.push(reviews[i]);
                        }
                    }
                });
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