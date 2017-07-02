/**
 * Created by Joe on 2017/6/30.
 */
var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel', reviewSchema);

reviewModel.createReview = createReview;
reviewModel.findReviewById = findReviewById;
// reviewModel.findReviewByUser = findReviewByUser;
// reviewModel.findReviewByMovie = findReviewByMovie;
reviewModel.deleteReview = deleteReview;
reviewModel.updateReview = updateReview;
reviewModel.findReviewByUserId = findReviewByUserId;
reviewModel.findAllReviews = findAllReviews;

module.exports = reviewModel;

function findAllReviews() {
    return reviewModel.find();
}

function findReviewByUserId(userId) {
    return reviewModel.findOne({reviewer: userId});
}

function createReview(review) {
    return reviewModel.create(review);
}

function findReviewById(reviewId) {
    return reviewModel.findById(reviewId);
}

function deleteReview(reviewId) {
    return reviewModel.remove({_id: reviewId});
}

function updateReview(reviewId, newReview) {
    delete newReview.reviewer;
    delete newReview.movie;
    return reviewModel.update({_id: reviewId}, {$set: newReview});
}


