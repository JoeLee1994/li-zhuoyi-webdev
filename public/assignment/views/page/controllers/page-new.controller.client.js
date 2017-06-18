/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController ($routeParams, $location, currentUser, pageService) {
        
        var model = this;

        model.userId = currentUser._id;
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

        function createPage (websiteId, page) {
            if (page === null || page === '' || typeof page === 'undefined') {
                model.error = "Name required!";
                model.submitted = true;
                return;
            }
            pageService
                .createPage(websiteId, page)
                .then(function () {
                    $location.url('/website/' + model.websiteId + '/page');
                });
        }
    }
})();