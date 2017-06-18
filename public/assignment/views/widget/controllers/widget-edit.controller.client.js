/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController ($routeParams, $location, widgetService, currentUser, $timeout) {
        var model = this;

        model.userId = currentUser._id;
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

                    if (model.widget.type === "HEADING") {
                        $timeout(function () {
                            model.options = [{
                                size: "1",
                                title: "1 (Largest)"
                            }, {
                                size: "2",
                                title: "2 (Very Large)"
                            }, {
                                size: "3",
                                title: "3 (Large)"
                            }, {
                                size: "4",
                                title: "4 (Small)"
                            }, {
                                size: "5",
                                title: "5 (Very Small)"
                            }, {
                                size: "6",
                                title: "6 (Smallest)"
                            }];
                        });
                        // initialize the selection
                        model.widget.size = "" + widget.size;
                    }
                });
        }
        init();


        function deleteWidget (widgetId) {
            widgetService
                .deleteWidget(widgetId)
                .then(function (){
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }

        function updateWidget (widgetId, widget) {
            if (widget.name === null || widget.name === '' || typeof widget.name === 'undefined') {
                model.error = "Name required!";
                model.submitted = true;
                return;
            }
            widgetService
                .updateWidget(widgetId, widget)
                .then(function (){
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                });
        }
    }
})();