/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {

        var model = this;

        var userId = $routeParams['userId'];

        model.user = userService.findUserById(userId);
    }
})();
