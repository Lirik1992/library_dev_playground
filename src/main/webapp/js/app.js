(function () {
    'use strict';

    var mainApp = angular.module('mainApp',
        ['ngSanitize',
            'ngRoute',
            'ngCookies',
            'toaster',
            'ngAnimate',
            'ui.bootstrap',
            'ngStorage']);


    mainApp.provider('appData', ['constants', function (constants) {
        this.$get = function () {

            var appName = constants.APP_NAME;
            var authors = constants.AUTHORS;
            var appVersion = constants.APP_VERSION;

            return {
                appName: appName,
                appAuthors: authors,
                appVersion: appVersion
            };
        };
    }]);

    mainApp.config([
        '$logProvider',
        '$routeProvider',
        '$locationProvider',
        '$httpProvider',
        function ($logProvider, $routeProvider, $locationProvider, $httpProvider) {
            $logProvider.debugEnabled(true);

            $httpProvider.interceptors.push('httpInterceptor');

            $routeProvider
                .when('/', {
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    templateUrl: 'js/partials/login.html',
                    pageName: 'Login',
                    requiresAuthentication: false
                })
                .when('/booksManagement', {
                    controller: 'BooksManagementController',
                    controllerAs: 'vm',
                    templateUrl: 'js/partials/booksManagement.html',
                    pageName: 'Books Management',
                    requiresAuthentication: true,
                    permissions: ['USER']
                })
                .when('/pupilsManagement', {
                    controller: 'PupilsManagementController',
                    controllerAs: 'vm',
                    templateUrl: 'js/partials/pupilsManagement.html',
                    pageName: 'Pupils Management'
                })
                .when('/recordCardsManagement', {
                    controller: 'RecordCards',
                    controllerAs: 'vm',
                    templateUrl: 'js/partials/recordCardsManagement.html',
                    pageName: 'Record Cards Management',
                    requiresAuthentication: true,
                    permissions: ['ADMIN', 'USER']
                })
                .when('/usersManagement', {
                    controller: 'UsersManagementController',
                    controllerAs: 'vm',
                    templateUrl: 'js/partials/usersManagement.html',
                    pageName: 'Users Management',
                    requiresAuthentication: true,
                    permissions: ['ADMIN']
                })
                .otherwise('/')
        }
    ]);

    mainApp.run(['$rootScope', '$templateCache', '$log', 'Auth', '$location', '$sessionStorage',
        function ($rootScope, $templateCache, $log, Auth, $location, $sessionStorage) {

            $rootScope.$on('$routeChangeStart', function (event, current, next) {
                $log.debug('Route change started : EVENT, CURRENT, NEXT');
                $log.debug(event);
                $log.debug(current);
                $log.debug(next);

                if(next) {
                    Auth.checkPermission(next.$$route.requiresAuthentication);
                }

                // if (!!next && !Auth.checkPermissionForView(next)) {
                //     event.preventDefault();
                //     $location.path('/');
                // }

                $rootScope.pageName = current.$$route.pageName;
            });

            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                console.log('successfully changed routes');
            });

            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                console.log('error changing routes');

                // $log.debug(event);
                // $log.debug(current);
                // $log.debug(previous);
                // $log.debug(rejection);
            })
        }])
}());
