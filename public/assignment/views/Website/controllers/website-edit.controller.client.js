/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams.websiteId;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }
        init();

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+model.userId+'/website');
        }

    }
})();