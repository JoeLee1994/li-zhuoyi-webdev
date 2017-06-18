/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController ($routeParams, $location, currentUser, pageService) {
        var model = this;

        model.userId = currentUser._id;
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
                    $location.url('/website/' + model.websiteId + '/page');
                });
        }

        function updatePage (pageId, page) {
            if (page.name === null || page.name === '' || typeof page.name === 'undefined') {
                model.error = "Name required!";
                model.submitted = true;
                return;
            }
            pageService
                .updatePage(pageId, page)
                .then(function (){
                    $location.url('/website/' + model.websiteId + '/page');
                });

        }
    }
})();