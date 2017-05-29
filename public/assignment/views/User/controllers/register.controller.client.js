/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('registerController', registerController);

    function registerController($location, userService) {

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

            var found = userService.findUserByUsername(username);

            if(found !== null) {
                model.error = "Sorry, this username has been taken.";
            } else {
                var newUser = {
                    username: username,
                    password: password
                };
                newUser = userService.createUser(newUser);
                $location.url('/user/' + newUser._id);
            }
        }
    }
})();
