/**
 * Created by Joe on 2017/5/28.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('widgetService', widgetService);
    
    function widgetService() {
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.deleteWidget = deleteWidget;
        this.createWidget = createWidget;
        this.updateWidget = updateWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function findWidgetsByPageId (pageId) {
            var results = [];

            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    results.push(widgets[w]);
                }
            }
            return results;
        }

        function findWidgetById (widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function deleteWidget (widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);
        }

        function createWidget (widgetType, pageId) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'size': '', 'text': ''};
                    break;
                case "IMAGE":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                    break;
                case "YOUTUBE":
                    widget =  {'_id': '', 'name': '', 'widgetType': '', 'pageId': '', 'width': '', 'url': '', 'text': ''};
                    break;
                default:
                    break;
            }
            widget.pageId = pageId;
            widget._id = (new Date()).getTime() + "";
            widget.widgetType = widgetType;
            widgets.push(widget);
            return widget._id;
        }

        function updateWidget (widgetId, widget) {
            for (var wg in widgets) {
                if (widgets[wg]._id === widgetId)
                    widgets[wg] = widget;
            }
        }
    }
})();