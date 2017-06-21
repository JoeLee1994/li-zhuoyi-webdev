/**
 * Created by Joe on 2017/6/13.
 */
(function () {
    angular
        .module('Project')
        .controller('showtimeController', showtimeController);

    function showtimeController(showtimeService) {
        var model = this;


        model.searchCityByName = searchCityByName;
        model.searchCinemaByCity = searchCinemaByCity;

        function searchCityByName(name) {
            showtimeService
                .searchCityByName(name)
                .then(searchCinemaByCity);

        }

        // function renderCity(response) {
        //     model.city = response;
        // }

        function searchCinemaByCity(id) {
            showtimeService
                .searchCinemaByCity(id)
                .then(renderCinemaDetails);
        }

        function renderCinemaDetails(response) {
            model.cinemas = response.search;
        }
    }
}());