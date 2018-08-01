(function () {
    angular.module('mainApp')
        .directive('permission', ['Auth', function (Auth) {
            return {
                restrict: 'A',
                scope: {
                    permission: '='
                },
                link: function ($scope, $elem, attrs) {
                    $scope.$watch(Auth.isAuthorized, function () {
                        if (Auth.userHasPermission($scope.permission)) {
                            //TODO: Do not put the element to the DOM
                            $elem.show();
                        } else {
                            $elem.hide();
                        }
                    })
                }
            }
        }])
}());