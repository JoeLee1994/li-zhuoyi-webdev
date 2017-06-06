/**
 * Created by Joe on 2017/6/6.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('flickrService', flickrService);

    function flickrService($http) {

        this.searchPhotos = searchPhotos;
        var key = "";
        var secret = "";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();