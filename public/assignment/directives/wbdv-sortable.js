/**
 * Created by Joe on 2017/6/6.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvDirectives', wdSortable);

    function wdSortable(widgetService) {
        var start = -1;
        var end = -1;
        function linkFunction(scope, element) {
            element.sortable({
                scroll: false,
                axis: "y",
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    widgetService
                        .reorderWidget(start, end);

                }
            });
        }
        return{
            link: linkFunction
        }
    }
})();