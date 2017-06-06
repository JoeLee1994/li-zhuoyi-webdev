/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {

        var model = this;

        model.register = register;

        function register(username, password, password2) {

            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = 'Username is required';
                return;
            }

            if (password === null || password === '' || typeof password === 'undefined') {
                model.error = 'Password cannot be empty!';
                return;
            }

            if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                model.error = 'Verifying Password cannot be empty!';
                return;
            }

            if (password !== password2) {
                model.error = "Passwords must match!";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(
                    function () {
                        model.error = "Sorry, this username has been taken.";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                         return userService
                            .createUser(newUser);
                }
            )
                .then(function (user) {
                    $location.url('/user/' + user._id);
                });
        }
    }
})();
