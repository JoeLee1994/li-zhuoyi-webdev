/**
 * Created by Joe on 2017/6/6.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, flickrService, widgetService, currentUser, $location) {

        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto =selectPhoto;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget =  {'_id': model.widgetId,
                'name': '',
                'text': '',
                'url': url,
                'widgetType': 'IMAGE',
                'pageId': model.pageId,
                'width': ''};
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function (){
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + model.widgetId);
                });
        }

        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }
    }
})();