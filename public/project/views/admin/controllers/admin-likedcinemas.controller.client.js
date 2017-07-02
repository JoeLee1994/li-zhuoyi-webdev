/**
 * Created by Joe on 2017/7/2.
 */

(function () {
    angular
        .module('Project')
        .controller('adminlikedCinemaController', adminlikedCinemaController);

    function adminlikedCinemaController(userService) {
        var model = this;

        model.createUser = createUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.deleteliking = deleteliking;

        function init() {
            findAllUsers();
        }
        init();

        function deleteliking(user, likedcinemaid) {
            var index = user.likedcinemas.indexOf(likedcinemaid);
            user.likedcinemas.splice(index, 1);
            userService
                .updateUser(user._id, user)
        }

        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }
    }
})();
