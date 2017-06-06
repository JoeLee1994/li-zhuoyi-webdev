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
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                    model.oldPages = angular.copy(model.pages);
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                    model.oldPage = angular.copy(model.page);
                });
        }
        init();


        function deletePage (pageId) {
            pageService
                .deletePage(pageId)
                .then(function (){
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });
        }

        function updatePage (pageId, page) {
            pageService
                .updatePage(pageId, page)
                .then(function (){
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });

        }
    }
})();