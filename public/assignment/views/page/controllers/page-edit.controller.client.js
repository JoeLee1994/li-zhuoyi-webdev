/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController ($routeParams, $location, pageService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.deletePage = deletePage;
        model.updatePage = updatePage;

        function init() {
            model.pages = pageService.findPagesByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        model.oldPages = angular.copy(model.pages);
        model.oldPage = angular.copy(model.page);

        function deletePage (pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function updatePage (pageId, page) {
            pageService.updatePage(pageId, page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();