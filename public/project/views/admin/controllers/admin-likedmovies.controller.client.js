/**
 * Created by Joe on 2017/7/2.
 */
/**
 * Created by Joe on 2017/6/17.
 */
(function () {
    angular
        .module('Project')
        .controller('adminlikedMovieController', adminlikedMovieController);

    function adminlikedMovieController(userService) {
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

        function deleteliking(user, likedmovieid) {
            var index = user.likedmovies.indexOf(likedmovieid);
            user.likedmovies.splice(index, 1);
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
