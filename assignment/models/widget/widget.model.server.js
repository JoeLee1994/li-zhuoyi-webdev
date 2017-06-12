/**
 * Created by Joe on 2017/6/12.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
        .then(function (widget) {
            pageModel.addWidget(pageId, widget._id);
            return widget;
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        // remember to sort each time you use find().
        .sort('order')
        .populate('_page')
        .exec(function(err, docs) { return docs; });
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}


//deleteWidgetFromPage
function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(widgetId);
        });
}


function reorderWidget(pageId, start, end) {
    // 1. find current ORDERED list of widgets on this page.
    return widgetModel
        .find({_page: pageId}, function (err, docs) {
            // 2. fetch the data as widgets
            widgets = docs.map(function (d) { return d.toObject() });

            // 3. delete the widget at start point and insert at end point
            var widget = widgets[start];
            widgets.splice(start, 1);
            widgets.splice(end, 0, widget);

            // 4. update the "order" attribute
            for (var w in widgets) {
                widgets[w].order = w;
            }

            // 5. remove the widgets in db
            return widgetModel.remove({_page: pageId}, function(err, docs) {
                // 6. recover the widgets with the new order in db
                return widgetModel.create(widgets, function (err, docs) { return docs; });
            });
        })
        .sort('order')
        .exec(function(err, docs) { return docs; });

}