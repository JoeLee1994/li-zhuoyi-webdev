/**
 * Created by Joe on 2017/6/6.
 */
const app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    // var widget = widgets.find(function (widget) {
    //     return widget._id === widgetId;
    // });
    //
    // widget.url = '/assignment/uploads/'+filename;
    //
    // var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/" + pageId + "/widget/" + widgetId;
    //
    // res.redirect(callbackUrl);
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget){
            widget.url = '/assignment/uploads/'+filename;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function () {
                    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+"/page/" + pageId + "/widget/" + widgetId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    res.send(err);
                });
        });
}


//widget.service.server

//
// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];


app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.put('/page/:pageId/widget', reorderWidget);


function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.send(err);
        });
    // widget._id = (new Date()).getTime() + "";
    // widgets.push(widget);
    // res.send(widget);
}

function findAllWidgetsForPage(req, res) {
    // var results = [];
    // for (var w in widgets) {
    //     if (widgets[w].pageId === req.params.pageId) {
    //         results.push(widgets[w]);
    //     }
    // }
    // res.json(results);
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.send(err);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.send(err);
        });

    // var widget = widgets.find(function (widget) {
    //     return widget._id === widgetId;
    // });
    // res.send(widget);
}

function updateWidget(req, res) {
    var newWidget = req.body;
    var widgetId = req.params.widgetId;

    widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });

    // for (var wg in widgets) {
    //     if (widgets[wg]._id === widgetId) {
    //         widgets[wg] = widget;
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);

}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
    // var widget = widgets.find(function (widget) {
    //     return widget._id === widgetId;
    // });
    // var index = widgets.indexOf(widget);
    // widgets.splice(index, 1);
    // res.sendStatus(200);
}

function reorderWidget(req, res) {
    var start = req.query['start'];
    var end = req.query['end'];
    var pageId = req.params.pageId;

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.send(err);
        });
    // var cachedWidgets = [];
    // var length = widgets.length;
    //
    // for (var i = length - 1; i >= 0; i--) {
    //     if (widgets[i].pageId === req.params.pageId) {
    //         cachedWidgets.unshift(widgets[i]);
    //         widgets.splice(i, 1);
    //     }
    // }
    // var widget = cachedWidgets[initial];
    // cachedWidgets.splice(initial, 1);
    // cachedWidgets.splice(final, 0, widget);
    // widgets = widgets.concat(cachedWidgets);
    // res.sendStatus(200);
}