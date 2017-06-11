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
                templateUrl: 'omdb.view.client.html',
                controller: 'omdbController',
                controllerAs: 'model'
            })
    }
})();