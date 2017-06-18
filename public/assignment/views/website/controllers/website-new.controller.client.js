/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWebsiteController', NewWebsiteController);

    function NewWebsiteController($routeParams, $location, currentUser, websiteService) {

        var model = this;

        model.userId = currentUser._id;
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(userId, website) {
            if (website === null || website === '' || typeof website === 'undefined') {
                model.error = "Name required!";
                model.submitted = true;
                return;
            }
            //website.developerId = model.userId;
            websiteService
                .createWebsite(userId, website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();