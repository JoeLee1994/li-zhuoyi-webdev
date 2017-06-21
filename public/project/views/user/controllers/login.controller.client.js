/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('Project')
        .controller('LoginController', LoginController);

    function LoginController($location, userService, $rootScope) {

        var model = this;

        model.login = login;

        function login(username, password) {
            if (username === null || username === '' || typeof username === 'undefined') {
                model.error1 = 'Username required!';
                model.error2 = null;
                model.error3 = null;
                model.submitted1 = true;
                return;
            }
            if (password === null || password === '' || typeof password === 'undefined') {
                model.error1 = null;
                model.error2 = 'Password required!';
                model.error3 = null;
                model.submitted2 = true;
                return;
            }
            model.error1 = null;
            model.error2 = null;

            userService
                .login(username, password)
                .then(succeed, handleError);

            function handleError() {
                model.error1 = null;
                model.error2 = null;
                model.error3 = "Sorry, no matching username and password found. Please try again.";
            }

            function succeed (found) {
                if (found !== null) {
                    // model.message = "Welcome " + username;
                    // $rootScope.currentUser = found;
                    $location.url('/profile');
                } else {
                    model.error1 = null;
                    model.error2 = null;
                    model.error3 = "Sorry, no matching username and password found. Please try again.";
                }
            }
        }
    }
})();
