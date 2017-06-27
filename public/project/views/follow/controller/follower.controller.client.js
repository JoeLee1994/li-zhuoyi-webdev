/**
 * Created by Joe on 2017/6/26.
 */
(function () {
    angular
        .module('Project')
        .controller('followerController', followerController);
    
    function followerController(currentUser, $location, $routeParams, userService) {
        var model = this;

        model.userId = currentUser._id;
        model.follow = follow;
        model.unfollow = unfollow;
        model.amIfollowing = amIfollowing;
        model.logout = logout;

        function init() {
            userService
                .findAllbefollowedbys(model.userId)
                .then(function (followers) {
                console.log(followers);
                model.followers = followers;
                if (followers.length === 0) {
                    model.message = "You have no followers.";
                }
            });
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }

        function amIfollowing(otherUserId) {
            return currentUser.following.indexOf(otherUserId) > -1;
        }

        function follow(userId) {
            var index = currentUser.following.indexOf(userId);
            if (index === -1) {
                currentUser.following.push(userId);
                userService
                    .updateUser(currentUser._id, currentUser)
                    .then(function () {
                        userService
                            .findUserById(userId)
                            .then(function (user) {
                                var index1 = user.befollowedby.indexOf(currentUser._id);
                                if (index1 === -1) {
                                    user.befollowedby.push(currentUser._id);
                                    userService
                                        .updateUser(userId, user);
                                }
                            });
                    });
            }
        }

        function unfollow(userId) {
            var index = currentUser.following.indexOf(userId);
            if (index !== -1) {
                currentUser.following.splice(index, 1);
                userService
                    .updateUser(currentUser._id, currentUser)
                    .then(function () {
                        userService
                            .findUserById(userId)
                            .then(function (user) {
                                var index1 = user.befollowedby.indexOf(currentUser._id);
                                if (index1 !== 1) {
                                    user.befollowedby.splice(index1, 1);
                                    userService
                                        .updateUser(userId, user);
                                }
                            });
                    });
            }
        }
    }
})();