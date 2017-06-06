/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {

        var model = this;

        model.login = login;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    if(found !== null) {
                        $location.url('/user/' + found._id);
                    } else {
                        model.message = "Sorry, " + username + " is not found. Please try again!";
                    }
                });
        }
    }
})();
