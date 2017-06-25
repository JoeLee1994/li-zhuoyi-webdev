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
                templateUrl: 'views/home/home.html',
                controller: 'MainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/search', {
                templateUrl: 'omdb/omdb.view.client.html',
                controller: 'omdbController',
                controllerAs: 'model'
            })

            .when('/showtime', {
                templateUrl: 'showtime/showtime.view.client.html',
                controller: 'showtimeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            // .when('/movies', {
            //     templateUrl: 'showtime/movie.view.client.html',
            //     controller: 'movieController',
            //     controllerAs: 'model'
            // })
            .when('/moviedetails/:movieId', {
                templateUrl: 'omdb/movie-details.view.client.html',
                controller: 'movieDetailsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })

            .when('/moviesonshow/:cinemaId', {
                templateUrl: 'showtime/movie.view.client.html',
                controller: 'movieController',
                controllerAs: 'model'
            })

            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })

            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })

            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })

            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when('/publisher', {
                templateUrl: 'views/publisher/publisher.view.client.html',
                resolve: {
                    currentUser: checkPublisher
                }
            })
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkAdmin(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkPublisher(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .checkPublisher()
            .then(function (user) {
                if (user === '0'){
                    deferred.reject();
                    $location.url('/');
                } else
                    deferred.resolve(user);
            });
        return deferred.promise;
    }


    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                    // $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

})();