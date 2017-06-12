/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('NewWidgetController', NewWidgetController);

    function NewWidgetController ($routeParams, $location, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        model.createWidget = createWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
        }
        init();

        function createWidget (pageId, widgetType) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'name': '', 'type': 'HEADING', '_page': '', 'size': '', 'text': '', 'order': 10000};
                    break;
                case "HTML":
                    widget =  {'name': '', 'type': 'HTML', '_page': '', 'text': '', 'order': 10000};
                    break;
                case "TEXT":
                    widget =  {'name': '', 'type': 'TEXT', '_page': '', 'rows': '', 'placeholder': '', 'formatted': '', 'order': 10000};
                    break;
                case "IMAGE":
                    widget =  {'name': '', 'type': 'IMAGE', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 10000};
                    break;
                case "YOUTUBE":
                    widget =  {'name': '', 'type': 'YOUTUBE', '_page': '', 'width': '', 'url': '', 'text': '', 'order': 10000};
                    break;
                default:
                    break;
            }
            // widget.widgetType = widgetType;
            // widget.pageId = model.pageId;
            widgetService
                .createWidget(pageId, widget)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }

    }
})();