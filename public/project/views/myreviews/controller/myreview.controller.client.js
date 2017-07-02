/**
 * Created by Joe on 2017/7/2.
 */
(function () {
    angular
        .module('Project')
        .controller('myReviewController', myReviewController);

    function myReviewController(currentUser, $location, reviewService, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.logout = logout;
        model.reviews = [];

        function init() {
            reviewService
                .findAllReviews()
                .then(function (reviews) {
                    for (var i =0; i< reviews.length; i++){
                        if(currentUser._id === reviews[i].reviewer[0]){
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