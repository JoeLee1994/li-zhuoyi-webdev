/**
 * Created by Joe on 2017/6/26.
 */
(function () {
    angular
        .module("Project")
        .controller("searchController", searchController);
    
    function searchController(currentUser, $location, $routeParams, userService) {

        var model = this;

        model.userId = currentUser._id;
        model.searchByUsername = searchByUsername;
        model.id = $routeParams.userId;
        model.amIfollowing = amIfollowing;
        model.follow = follow;
        model.unfollow = unfollow;
        model.logout = logout;

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

        function searchByUsername(keyword) {
            if (typeof keyword === 'undefined' || keyword === '' || keyword === null) {
                model.error = "Search content cannot be empty!";
                model.result = null;
                return;
            }
            userService
                .searchByUsername(keyword)
                .then(function (response) {
                model.error = null;
                model.result = response;
                if (model.result.length === 0) {
                    model.error = 'Not found any related users!';
                    model.result = null;
                }
            });
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
                                console.log(user.befollowedby);
                                user.befollowedby.push(currentUser._id);
                                console.log(user.befollowedby);
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
                            console.log(user.befollowedby);
                            userService
                                .updateUser(userId, user);
                        }
                    });
                });
            }
        }
    }
})();