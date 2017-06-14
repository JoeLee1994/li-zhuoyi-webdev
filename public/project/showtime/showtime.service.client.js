/**
 * Created by Joe on 2017/6/13.
 */
(function () {
    angular
        .module('Project')
        .factory('showtimeService', showtimeService);

    function showtimeService($http) {

        var api = {
            searchByMovieandLocation: searchByMovieandLocation,
            searchByTitle: searchByTitle,
        };
        return api;

        function searchByMovieandLocation(movieId, location) {
            var url = "https://api.internationalshowtimes.com/v4/showtimes?movie_id="+movieId+"&location="+location+"&distance=30";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchByTitle(title) {
            var url = "https://api.internationalshowtimes.com/v4/movies?search_query=My%20First%20Lady&search_field="+title;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();
    
    
    