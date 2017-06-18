/**
 * Created by Joe on 2017/6/18.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('MainController', MainController);

    function MainController(currentUser, userService) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout(){
            userService
                .logout()
                .then(function (){
                    location.reload();
                })
        }
    }
})();