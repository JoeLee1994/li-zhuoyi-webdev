/**
 * Created by Joe on 2017/6/30.
 */
(function () {
    angular
        .module('Project')
        .factory('reviewService', reviewService);

    function reviewService($http) {
        var api = {
            createReview: createReview,
            findReviewById: findReviewById,
            deleteReview: deleteReview,
            updateReview: updateReview,
            findReviewByUserId: findReviewByUserId,
            findAllReviews: findAllReviews
        };
        return api;

        function findAllReviews() {
            var url = "/api/project/reviews";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewByUserId(userId) {
            var url = "/api/project/review/" + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(review) {
            var url = "/api/project/review";
            return $http
                .post(url, review)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewById(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(reviewId) {
            var url = "/api/project/review/" + reviewId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(reviewId, review) {
            var url = "/api/project/review/" + reviewId;
            return $http
                .put(url, review)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();