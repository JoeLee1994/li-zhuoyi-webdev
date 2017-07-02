/**
 * Created by Joe on 2017/6/17.
 */
(function () {
    angular
        .module('Project')
        .controller('adminFollowController', adminFollowController);

    function adminFollowController(userService) {
        var model = this;

        model.createUser = createUser;
        model.deleteUser = deleteUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.deletefollowing = deletefollowing;

        function init() {
            findAllUsers();
        }
        init();

        function deletefollowing(user, followingid) {
            var index = user.following.indexOf(followingid);
            user.following.splice(index, 1);
            userService
                .updateUser(user._id, user);


            userService
                .findUserById(followingid)
                .then(function (foundUser) {
                    console.log(foundUser);
                    var index1 = foundUser.befollowedby.indexOf(user._id);
                    foundUser.befollowedby.splice(index1, 1);
                    userService
                        .updateUser(foundUser._id, foundUser)
                });

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

        function updateUser(user1, user2) {
            userService
                .updateUser(user1._id, user1)


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