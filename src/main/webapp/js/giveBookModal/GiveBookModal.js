(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('GiveBookModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			'$rootScope',
			GiveBookModal
		]);

	function GiveBookModal($scope, $log, $uibModalInstance, restService, toasterService, data, $rootScope) {
    var vm = this;
    vm.currentPupil = data.name;
		$log.debug(data);
		
		vm.loading = true;
		$rootScope.modalBookSearchQuery = {};

		vm.giveBook = function(bookId) {
			$scope.loading = true;
			restService.giveBookToPupil(data.id, bookId)
				.success(function(data) {
					$log.debug(data);
					vm.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'You gave book to ' + vm.currentPupil);
					vm.init();
				})
				.error(function(data, status) {
					$log.debug(data);
					toasterService.getConfiguredToaster('error', 'Error', 'Failed to give book to ' + data.name);
				})
				.finally(function() {
					$log.debug('Finally give book');
					vm.loading = false;
				})
				.catch(function(error) {
					$log.debug(error);
				})
		}

		vm.init = function() {
			restService
				.getActiveBooks(data.id)
				.success(function(response) {
					$log.debug(response);
					$scope.allBooks = response.books;
					vm.loading = false;

					/* Pagination for table */
					$scope.currentPage = 1;
					$scope.itemsPerPage = 10;
					$scope.totalItems = response.totalItems;
					$scope.numPages = response.pageCount;
				})
				.error(function(data, status) {
					$log.debug(data);
				})
				.finally(function() {
					$log.debug('Finally find some books');
					vm.loading = false;
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		vm.init();

		$scope.pageChanged = function() {
			vm.loading = true;
			$rootScope.modalBookSearchQuery.page = $scope.currentPage;
			$log.debug($rootScope.modalBookSearchQuery);

			// Operation to perform on page changed with search
			restService
				.getActiveBooks(data.id, $rootScope.modalBookSearchQuery)
				.success(function(response) {
					$log.debug(response);
					$scope.allBooks = response.books;
					vm.loading = false;
				})
				.error(function(data, status) {
					$log.debug(data);
				})
				.finally(function() {
					$log.debug('Finally change page');
					vm.loading = false;
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		$scope.search = function() {
			$log.debug($scope.booksSearch);
			vm.loading = true;
			if(typeof $scope.booksSearch !== 'undefined') {
				$rootScope.modalBookSearchQuery = $scope.booksSearch;
			}
			restService
				.getActiveBooks(data.id ,$scope.booksSearch)
				.success(function(response) {
					$log.debug(response);
					$scope.allBooks = response.books;
					$scope.currentPage = 1;
					$scope.totalItems = response.totalItems;
					$scope.numPages = response.pageCount;
					vm.loading = false;
				})
				.error(function(data, status) {
					$log.debug(data);
				})
				.finally(function() {
					$log.debug('Finally search with query');
					vm.loading = false;
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		vm.ok = function() {};

		vm.cancel = function() {
			$uibModalInstance.close();
		};
	}
})();
