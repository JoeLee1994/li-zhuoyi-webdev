/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('Project')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, currentUser, userService) {

        var model = this;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.user = currentUser;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.unregister = unregister;

        //model.user = userService.findUserById(model.userId);
        // userService
        //     .findUserById(model.userId)
        //     .then(renderUser);
        // function init() {
        //     renderUser(currentUser);
        // }
        // init();
        //
        // function renderUser(user) {
        //     model.user = user;
        // }


        function updateUser (userId, user) {
            userService
                .updateUser(userId, user)
                .then(function () {
                model.message = "Update successfully!";
            });
        }

        function deleteUser (userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                }, function () {
                    model.error = "Unable to delete you!";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function() {
                    $location.url("/");
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();
