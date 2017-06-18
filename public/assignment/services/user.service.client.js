/**
 * Created by Joe on 2017/5/27.
 */
(function () {
    angular
        .module('WebAppMaker')
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
            register: register,
            updateUser: updateUser,
            deleteUser: deleteUser,
            unregister: unregister
        };
        return api;

        function createUser (user) {
            var url = "/api/assignment/user";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById (userId) {
            var url = "/api/assignment/user/" + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials (username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername (username) {
            var url = "/api/assignment/user?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers () {
            var url = "/api/assignment/users";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/assignment/login";
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
            return $http.post("/api/assignment/logout");
        }

        function loggedin() {
            return $http.get("/api/assignment/loggedin")
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin() {
            return $http.get("/api/assignment/checkAdmin")
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = "/api/assignment/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister(userObj) {
            var url = "/api/assignment/unregister";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser (userId, user) {
            var url = "/api/assignment/user/" + userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser (userId) {
            var url = "/api/assignment/user/" + userId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();