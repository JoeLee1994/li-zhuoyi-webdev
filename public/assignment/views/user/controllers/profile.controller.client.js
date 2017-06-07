/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, userService) {

        var model = this;

        model.userId = $routeParams['userId'];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        //model.user = userService.findUserById(model.userId);
        userService
            .findUserById(model.userId)
            .then(renderUser);

        function renderUser(user) {
            model.user = user;
        }


        function updateUser (userId, user) {
            userService
                .updateUser(userId, user)
                .then(function () {
                model.message = "Update successfully!";
            });
        }

        function deleteUser (userId) {
            userService.deleteUser(userId)
                .then(function () {
                    $location.url('/login');
                }, function () {
                    model.error = "Unable to delete you!";
                });
        }
    }
})();
