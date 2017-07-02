/**
 * Created by Joe on 2017/7/2.
 */
/**
 * Created by Joe on 2017/6/17.
 */
(function () {
    angular
        .module('Project')
        .controller('adminReviewController', adminReviewController);

    function adminReviewController(reviewService) {
        var model = this;

        model.createReview = createReview;
        model.deleteReview = deleteReview;
        model.selectReview = selectReview;
        model.updateReview = updateReview;

        function init() {
            findAllReviews();
        }
        init();

        function createReview(review) {
            reviewService
                .createReview(review)
                .then(findAllReviews);
        }

        function deleteReview(review) {
            reviewService
                .deleteReview(review._id)
                .then(findAllReviews);
        }

        function selectReview(review) {
            model.review = angular.copy(review);
        }

        function updateReview(review) {
            reviewService
                .updateReview(review._id, review)
                .then(findAllReviews);
        }

        function findAllReviews() {
            reviewService
                .findAllReviews()
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }
    }
})();