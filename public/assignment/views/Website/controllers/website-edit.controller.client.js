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
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        model.oldWebsites = angular.copy(model.websites);
        model.oldWebsite = angular.copy(model.website);

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

        function updateWebsite (websiteId, website) {
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();