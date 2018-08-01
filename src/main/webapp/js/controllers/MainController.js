(function () {
    angular.module('mainApp')
        .controller('MainController', ['$rootScope', 'Auth', '$location', '$cookies', '$scope', '$timeout', 'toasterService', '$cookies', MainController]);

    function MainController($rootScope, Auth, $location, $cookies, $scope, $timeout, toasterService, $cookies) {
        var vm = this;

        $scope.profileCaret = true;

        $scope.$on('spinner:start', function () {
            $scope.loading = true;
            console.log('loading');
        });

        $scope.$on('spinner:stop', function () {
            $scope.loading = false;
            console.log('loading finished');
        });

        $scope.isAuthorized = function () {
            return Auth.isLoggedIn();
        };

        // vm.editProfile = function() {
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         ariaLabelledBy: 'modal-title',
        //         ariaDescribedBy: 'modal-body',
        //         templateUrl: 'js/editProfileModal/EditProfileModal.html',
        //         controller: 'EditProfileModal',
        //         controllerAs: 'vm',
        //         size: size,
        //         appendTo: parentElem,
        //         resolve: {
        //             book: function () {
        //                 return data;
        //             }
        //         }
        //     });

        //     modalInstance.result.then(function () {
        //         $scope.init();
        //     }, function () {
        //         $scope.init();
        //         $log.info('Modal dismissed at: ' + new Date());
        //     });
        // }

        vm.logout = function () {
            Auth.logout();
            $timeout(function () {
                toasterService.getConfiguredToaster('success', 'Success', 'Successfully logged out');
            }, 10);
            $location.path('/');
        };

        $scope.isLoggedIn = function () {
            return Auth.isLoggedIn();
        };

        $scope.toggleProfileCaret = function () {
            $scope.profileCaret = !$scope.profileCaret;
        };
    }
}());