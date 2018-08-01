(function () {
    'use strict';

    angular.module('mainApp')
        .controller('RecordCards', ['$scope', 'restService', 'toasterService', '$log', '$location', 'Auth', '$uibModal', '$rootScope', RecordCards])

    function RecordCards($scope, restService, toasterService, $log, $location, Auth, $uibModal, $rootScope) {

        var vm = this;

        $rootScope.pupilSearchQuery = {};

        // Check if user is logged in, and redirect to Login page if not
        if (!Auth.isLoggedIn) {
            $location.path('/');
        }

        vm.open = function (size, type, data, parentSelector) {

            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

            switch (type) {
                case 'giveBook':
                    vm.options.controller = 'GiveBookModal';
                    vm.options.templateUrl = 'js/giveBookModal/GiveBook.html';
                    break;
                case 'returnBook':
                    vm.options.controller = 'ReturnBookModal';
                    vm.options.templateUrl = 'js/returnBookModal/ReturnBook.html';
                    break;
            }

            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: vm.options.templateUrl,
                controller: vm.options.controller,
                controllerAs: 'vm',
                size: size,
                appendTo: parentElem,
                resolve: {
                    data: function () {
                        return data;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.init();
            }, function () {
                $scope.init();
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // Empty object for modal properties
        vm.options = {};

        $scope.sortType = 'title'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order
        $scope.searchFor = ''; // set the default search/filter term

        //Loading state on table
        $scope.$emit('spinner:start');

        //Default call to API
        $scope.init = function () {
            restService
                .getPupilsWithSearch()
                .success(function (response) {
                    $log.debug(response);
                    $scope.allPupils = response.pupils;
                    $scope.$emit('spinner:stop');                      

                    /* Pagination for table */
                    $scope.currentPage = 1;
                    $scope.itemsPerPage = 10;
                    $scope.totalItems = response.totalItems;
                    $scope.numPages = response.pageCount;

                    $scope.pageChanged = function () {
                        $scope.$emit('spinner:start');

                        $rootScope.pupilSearchQuery.page = $scope.currentPage;
                        $log.debug($rootScope.pupilSearchQuery);

                        // operation to perform on page changed
                        restService.getPupilsWithSearch($rootScope.pupilSearchQuery)
                            .success(function (response) {
                                $log.debug(response);
                                $scope.allPupils = response.pupils;
                                $scope.$emit('spinner:stop');
                            })
                            .error(function (data, status) {
                                $log.debug(data);
                            })
                            .finally(function () {
                                $log.debug('Finally change page');
                            })
                            .catch(function (error) {
                                $log.debug(error);
                            });
                    };
                })
                .error(function (data, status) {
                    $log.debug(data);
                })
                .finally(function () {
                    $log.debug('Finally find some pupils');
                })
                .catch(function (error) {
                    $log.debug(error);
                });
        };

        $scope.init();


        // Search with search form
        $scope.search = function (data) {
            $log.debug($scope.pupilSearch);
            $log.debug(data);
            if(typeof $scope.pupilSearch !== 'undefined') {
                $rootScope.pupilSearchQuery = $scope.pupilSearch;
            }
            $scope.$emit('spinner:start');
            restService.getPupilsWithSearch($scope.pupilSearch)
                .success(function (response) {
                    $log.debug(response);
                    $scope.allPupils = response.pupils;
                    $scope.currentPage = 1;
                    $scope.totalItems = response.totalItems;
                    $scope.numPages = response.pageCount;
                    $scope.$emit('spinner:stop');
                })
                .error(function (data, status) {
                    $log.debug(data);
                })
                .finally(function () {
                    $log.debug('Finally search with query');
                })
                .catch(function (error) {
                    $log.debug(error);
                });
        };

    }
}())