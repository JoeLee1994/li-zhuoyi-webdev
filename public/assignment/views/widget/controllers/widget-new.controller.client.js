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
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createWidget (widgetType) {
            widgetId = widgetService.createWidget(widgetType, model.pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widgetId);
        }

    }
})();