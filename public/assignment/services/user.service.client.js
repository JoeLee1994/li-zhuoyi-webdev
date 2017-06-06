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
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data
            });
            //user._id = (new Date()).getTime() + "";
            //user.created = new Date();
            //users.push(user);
            //return user;
        }

        function findUserByUsername(username) {
            var url = "/api/assignment/user?username="+username;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            //var user = users.find(function (user) {
            //    return user.username === username;
            //});
            //if (typeof user === 'undefined') {
              //  return null;
            //}
            //return user;
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username="+username+"&password="+password;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updateUser(userId, user) {
            var url = "/api/assignment/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();