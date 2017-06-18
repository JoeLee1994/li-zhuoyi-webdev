/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, $location, currentUser, websiteService) {

        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                    model.oldWebsites = angular.copy(model.websites);
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website) {
                    model.website = website;
                    model.oldWebsite = angular.copy(model.website);
                });
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/website');
                });
        }

        function updateWebsite (websiteId, website) {
            if (website.name === null || website.name === '' || typeof website.name === 'undefined') {
                model.error = "Name required!";
                model.submitted = true;
                return;
            }
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/website');
                });
        }
    }
})();