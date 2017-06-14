/**
 * Created by Joe on 2017/6/7.
 */
(function () {
    angular
        .module("Project")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/search', {
                templateUrl: 'omdb/omdb.view.client.html',
                controller: 'omdbController',
                controllerAs: 'model'
            })
            .when('/showtime', {
                templateUrl: 'showtime/showtime.view.client.html',
                controller: 'showtimeController',
                controllerAs: 'model'
            })
    }
})();