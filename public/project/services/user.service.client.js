/**
 * Created by Joe on 2017/6/20.
 */
/**
 * Created by Joe on 2017/5/27.
 */
(function () {
    angular
        .module('Project')
        .factory('userService', userService);

    function userService($http) {


        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            login: login,
            logout: logout,
            loggedin: loggedin,
            checkAdmin: checkAdmin,
            checkPublisher: checkPublisher,
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser,
            unregister: unregister,
            findAlllikedMovies: findAlllikedMovies,
            searchByUsername: searchByUsername,
            findAllFollowings: findAllFollowings,
            findAllbefollowedbys: findAllbefollowedbys
        };
        return api;

        function findAllFollowings(userId) {
            var url = "/api/project/user/" + userId + "/followings";
            return $http
                .get(url)
                .then(function (response) {
                return response.data;
            })
        }

        function findAllbefollowedbys(userId) {
            var url = "/api/project/user/" + userId + "/befollowedbys";
            return $http
                .get(url)
                .then(function (response) {
                return response.data;
            })
        }

        function searchByUsername(keyword) {
            var url = "/api/project/search/user/" + keyword;
            return $http
                .get(url)
                .then(function (response) {
                return response.data;
            });
        }

        function findAlllikedMovies(userId) {
            var url = "/api/project/user/" + userId + "/likedmovies";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function checkPublisher() {
            return $http.get("/api/project/checkPublisher")
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser (user) {
            var url = "/api/project/user";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById (userId) {
            var url = "/api/project/user/" + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials (username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername (username) {
            var url = "/api/project/user?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers () {
            var url = "/api/project/users";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/project/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http
                .post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function loggedin() {
            return $http.get("/api/project/loggedin")
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            return $http.get("/api/project/checkAdmin")
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/project/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister(userObj) {
            var url = "/api/project/unregister";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser (userId, user) {
            var url = "/api/project/user/" + userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser (userId) {
            var url = "/api/project/user/" + userId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();