/**
 * Created by Joe on 2017/5/26.
 */
(function(){
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location) {

        var model = this;

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        model.login = login;

        function login(username, password) {
            var found = null;
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    found = user;
                    break;
                }
            }
            if(found !== null) {
                //model.message = "welcome " + username;
                $location.url('/profile／' + found._id);
            } else {
                model.message = "sorry, " + username + " not found. please try again!";
            }
        }
    }
})();
