/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController);

    function WidgetListController($sce, $routeParams, widgetService) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;
        
        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();


        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl = "http://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function widgetUrl(widget) {
            var url = "views/widget/templates/widget-" + widget.type.toLowerCase() + ".view.client.html";
            return url;
        }
    }
})();