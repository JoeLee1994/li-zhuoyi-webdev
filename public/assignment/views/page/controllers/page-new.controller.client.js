/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController ($routeParams, $location, pageService) {
        
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.createPage = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }
        init();

        function createPage (page) {
            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });
        }
    }
})();