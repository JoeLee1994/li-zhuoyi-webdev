/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

    }
})();