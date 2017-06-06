/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWebsiteController', EditWebsiteController);

    function EditWebsiteController($routeParams, $location, websiteService) {

        var model = this;

        model.userId = $routeParams['userId'];
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
                    $location.url('/user/' + model.userId + '/website');
                });
        }

        function updateWebsite (websiteId, website) {
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }
    }
})();