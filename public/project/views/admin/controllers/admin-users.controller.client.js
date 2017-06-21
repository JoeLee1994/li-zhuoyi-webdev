/**
 * Created by Joe on 2017/6/17.
 */
(function () {
    angular
        .module('Project')
        .controller('adminUserController', adminUserController);

    function adminUserController(userService) {
        var model = this;

        model.createUser = createUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        }
        init();

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