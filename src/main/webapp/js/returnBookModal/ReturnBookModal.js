(function () {
  'use strict';
  angular
    .module('mainApp')
    .controller('ReturnBookModal', [
      '$scope',
      '$log',
      '$uibModalInstance',
      'restService',
      'toasterService',
      'data',
      '$rootScope',
      ReturnBookModal
    ]);

  function ReturnBookModal($scope, $log, $uibModalInstance, restService, toasterService, data, $rootScope) {
    var vm = this;
    vm.currentPupil = data.id;
    $log.debug(data);

    vm.loading = true;
    $rootScope.modalBookSearchQuery = {};

    vm.returnBook = function (bookId) {
      vm.loading = true;
      restService.returnBook(bookId, vm.currentPupil)
        .success(function (data) {
          $log.debug(data);
          vm.loading = false;
          toasterService.getConfiguredToaster('success', 'Success', 'Book has been returned');
          vm.init();
        })
        .error(function (data, status) {
          $log.debug(data);
          toasterService.getConfiguredToaster('error', 'Error', 'Failed to return book');
        })
        .finally(function () {
          $log.debug('Finally give book');
          vm.loading = false;
        })
        .catch(function (error) {
          $log.debug(error);
        })
    }

    vm.init = function () {
      restService
        .getPupilBooks(vm.currentPupil)
        .success(function (response) {
          $log.debug(response);
          $scope.allBooks = response.books;
          vm.loading = false;

          /* Pagination for table */
          $scope.currentPage = 1;
          $scope.itemsPerPage = 10;
          $scope.totalItems = response.totalItems;
          $scope.numPages = response.pageCount;
        })
        .error(function (data, status) {
          $log.debug(data);
        })
        .finally(function () {
          $log.debug('Finally find some books');
          vm.loading = false;
        })
        .catch(function (error) {
          $log.debug(error);
        });
    };

    vm.init();

    $scope.pageChanged = function () {
      vm.loading = true;

      // Operation to perform on page changed
      restService
        .getPupilBooks(vm.currentPupil)
        .success(function (response) {
          $log.debug(response);
          $scope.allBooks = response.books;
          vm.loading = false;
        })
        .error(function (data, status) {
          $log.debug(data);
        })
        .finally(function () {
          $log.debug('Finally change page');
          vm.loading = false;
        })
        .catch(function (error) {
          $log.debug(error);
        });
    };

    vm.ok = function () { };

    vm.cancel = function () {
      $uibModalInstance.close();
    };
  }
})();
