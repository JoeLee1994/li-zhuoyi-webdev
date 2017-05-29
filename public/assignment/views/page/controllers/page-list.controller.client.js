/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController);

    function PageListController ($routeParams, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
        }
        init();

    }
})();