(function () {
    angular.module('mainApp')
        .factory('Auth', ['$location', '$cookies', '$log',
            'restService', 'toasterService', '$sessionStorage', '$rootScope', '$http', '$q', Auth]);

    function Auth($location, $cookies, $log,
                  restService, toasterService, $sessionStorage, $rootScope, $http, $q) {
        return {
            authenticate: authenticate,
            login: login,
            logout: logout,
            userHasPermission: userHasPermission,
            isLoggedIn: isLoggedIn,
            checkPermission: checkPermission,
            isAuthorized: isAuthorized

        };

        function logout() {
            delete $sessionStorage.token;
            delete $sessionStorage.roles;
            delete $rootScope.token;
            delete $rootScope.roles;
        }


        function login(loginForm) {
            return $http.post('http://localhost:8082/login', loginForm);
        }


        function authenticate() {
            return $http.get('http://localhost:8082/api/v.1.0/user/authorization', {
                headers: {
                    'Authorization': 'Bearer ' + $cookies.get('token')
                }
            })
                .then(successResponse)
                .catch(errorResponse);

            function successResponse(response) {
                $sessionStorage.roles = response.data.roles;
                $rootScope.roles = $sessionStorage.roles;
                return response;
            }
            function errorResponse(response) {
                return $q.reject(response);
            }
        }



        // function register(data) {
        //     $log.debug(data);
        // }

        function logout() {
            $cookies.remove('token');
            delete $sessionStorage.user;
            delete $sessionStorage.roles;
            delete $rootScope.roles;
        }

        function checkPermission(perms) {
            $log.debug(perms)
        }


        function userHasPermission(permissions) {
            if (!this.isLoggedIn()) {
                return false;
            }

            $log.debug(permissions);
            $log.debug($sessionStorage.roles);

            var found = false;
            angular.forEach(permissions, function (permission, index) {
                if ($sessionStorage.roles.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
            });

            return found;
        }

        function isAuthorized() {
            return $sessionStorage.roles != null;
        }

        function isLoggedIn() {
            return $sessionStorage.user != null;
        }
    }
}());