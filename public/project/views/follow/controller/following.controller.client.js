/**
 * Created by Joe on 2017/6/26.
 */
(function () {
    angular
        .module("Project")
        .controller('followingController', followingController);
    
    function followingController($routeParams, $location, currentUser, userService) {

        var model = this;
        model.userId = currentUser._id;
        model.unfollow = unfollow;
        model.amIfollowing = amIfollowing;
        model.logout = logout;

        function init() {
            userService
                .findAllFollowings(model.userId)
                .then(function (followings) {
                model.followings = followings;
                if (followings.length === 0) {
                    model.message = "You have no followings.";
                }
            });
        }
        init();

        // function follow(userId) {
        //     var index = currentUser.following.indexOf(userId);
        //     if (index === -1) {
        //         currentUser.following.push(userId);
        //         userService
        //             .updateUser(currentUser._id, currentUser)
        //             .then(function () {
        //                 userService
        //                     .findUserById(userId)
        //                     .then(function (user) {
        //                         var index1 = user.befollowedby.indexOf(currentUser._id);
        //                         if (index1 === -1) {
        //                             console.log(user.befollowedby);
        //                             user.befollowedby.push(currentUser._id);
        //                             console.log(user.befollowedby);
        //                             userService
        //                                 .updateUser(userId, user);
        //                         }
        //                     });
        //             });
        //     }
        // }

        function unfollow(userId) {
            var index = currentUser.following.indexOf(userId);
            if (index !== -1) {
                currentUser.following.splice(index, 1);
                userService
                    .updateUser(currentUser._id, currentUser)
                    .then(function () {
                        init();
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

        function amIfollowing(otherUserId) {
            return currentUser.following.indexOf(otherUserId) > -1;
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                });
        }
    }
})();