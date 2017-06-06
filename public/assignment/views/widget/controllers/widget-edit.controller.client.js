/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController ($routeParams, $location, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                    model.oldWidgets = angular.copy(model.widgets);
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                    model.oldWidget = angular.copy(model.widget);
                });
        }
        init();


        function deleteWidget (widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function (){
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

        function updateWidget (widgetId, widget) {
            widgetService
                .updateWidget(widgetId, widget)
                .then(function (){
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
    }
})();