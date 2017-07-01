/**
 * Created by Joe on 2017/6/30.
 */
var app = require('../../express');
var reviewModel = require('../models/review/review.model.server');

app.post ('/api/project/review', createReview);
app.get('／api/project/review/:reviewId', findReviewById);
app.delete('/api/project/review/:reviewId', deleteReview);
app.put('/api/project/review/:reviewId', updateReview);
app.get('/api/project/review/:userId', findReviewByUserId);
app.get('/api/project/reviews', findAllReviews);

function findAllReviews(req, res) {
    reviewModel
        .findAllReviews()
        .then(function (reviews) {
            res.send(reviews);
        })
}

function findReviewByUserId(req, res) {
    userId = req.params['userId'];
    reviewModel
        .findReviewByUserId(userId)
        .then(function (review) {
            res.send(review);
        }, function (err) {
            res.send(err);
        });
}

function createReview(req, res) {
    var review = req.body;
    reviewModel
        .createReview(review)
        .then(function (review) {
            console.log(review)
            res.send(review);
        }, function (err) {
            res.send(err);
        });
}

function findReviewById(req, res) {
    reviewId = req.params['reviewId'];
    reviewModel
        .findReviewById(reviewId)
        .then(function (review) {
            res.send(review);
        }, function (err) {
            res.send(err);
        });
}

function updateReview(req, res) {
    var newReview = req.body;
    var reviewId = req.params.reviewId;
    reviewModel
        .updateReview(reviewId, newReview)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function deleteReview(req, res) {
    reviewId = req.params['reviewId'];
    reviewModel
        .deleteReview(reviewId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}
