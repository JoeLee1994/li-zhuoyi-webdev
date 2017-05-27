/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WAM', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/User/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/User/templates/register.view.client.html'
            })
            .when('/profile/:userId', {
                templateUrl: 'views/User/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            });
    }
})();
