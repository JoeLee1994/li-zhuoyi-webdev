/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {

        var model = this;

        model._register = _register;

        function _register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error1 = 'Username required!';
                model.error2 = null;
                model.error3 = null;
                model.error4 = null;
                model.submitted1 = true;
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error1 = null;
                model.error2 = 'Password required!';
                model.error3 = null;
                model.error4 = null;
                model.submitted2 = true;
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error1 = null;
                model.error2 = null;
                model.error3 = 'Verifying Password required!';
                model.error4 = null;
                model.submitted3 = true;
                return;
            }

            if (password !== password2) {
                model.error1 = null;
                model.error2 = null;
                model.error3 = null;
                model.error4 = "Passwords must match!";
                model.password = "";
                model.password2 = "";
                model.submitted2 = true;
                model.submitted3 = true;
                return;
            }
            model.error1 = null;
            model.error2 = null;
            model.error3 = null;
            model.error4 = null;

            userService
                .findUserByUsername(username)
                .then(checkUser);

            function checkUser(user) {
                if (user) {
                    model.error1 = "Sorry, this username has already been taken.";
                } else {
                    var newUser = {
                        username: username,
                        password: password
                    };

                    userService
                        .register(newUser)
                        .then(function () {
                            $location.url('/profile');
                        });
                }
            }
        }
    }
})();




