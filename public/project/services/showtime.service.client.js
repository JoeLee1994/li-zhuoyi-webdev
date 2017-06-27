/**
 * Created by Joe on 2017/6/13.
 */
(function () {
    angular
        .module('Project')
        .factory('showtimeService', showtimeService);

    function showtimeService($http) {

        var api = {
            searchCityByName : searchCityByName,
            searchCinemaByCity: searchCinemaByCity,
            searchMovieByCinema: searchMovieByCinema
        };
        return api;

        function searchCityByName(name) {
            var url = "https://api.internationalshowtimes.com/v4/cities/"+name.replace(/\s+/g,"-")+"/?apikey=WOeF9mNfP1CyUU1tnF1eimGhfX1aQkup";
            return $http
                .get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data.city;
                })
        }


        function searchCinemaByCity(id) {
            var url = "https://api.internationalshowtimes.com/v4/cinemas/?city_id="+id+"&apikey=WOeF9mNfP1CyUU1tnF1eimGhfX1aQkup";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchMovieByCinema(id) {
            var url = "https://api.internationalshowtimes.com/v4/movies/?cinema_id="+id+"&apikey=WOeF9mNfP1CyUU1tnF1eimGhfX1aQkup";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();
    
    
    