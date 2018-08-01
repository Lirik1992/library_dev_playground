(function() {
  'use strict';

  angular.module('mainApp')
    .factory('httpInterceptor', ['$log', '$cookies', '$location', '$sessionStorage', httpInterceptor]);

    function httpInterceptor($log, $cookies, $location, $sessionStorage) {
      var sessionInjector = {
        request: function(config) {
          $log.debug(config);
          config.headers['Authorization'] = 'Bearer ' + $cookies.get('token');
          return config;
        }
      };
      return sessionInjector;
    }
}());