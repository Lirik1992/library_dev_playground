(function() {
	'use strict';

	angular
		.module('mainApp')
		.controller('BooksManagementController', [
			'$scope',
			'Auth',
			'restService',
			'toasterService',
			'$log',
			'$location',
			'$uibModal',
			'$document',
			'$cookies',
			'$rootScope',
			BooksManagementController
		]);

	function BooksManagementController(
		$scope,
		Auth,
		restService,
		toasterService,
		$log,
		$location,
		$uibModal,
		$document,
		$cookies,
		$rootScope
	) {
		var vm = this;

		// Check if user is logged in, and redirect to Login page if not
		if (!Auth.isLoggedIn) {
			$location.path('/');
		}

		// Empty object for search query
		$rootScope.bookSearchQuery = {};

		// Empty object for modal properties
		vm.options = {};

		$scope.sortType = 'title'; // set the default sort type
		$scope.sortReverse = false; // set the default sort order
		$scope.searchFor = ''; // set the default search/filter term

		//Loading state on table
		$scope.$emit('spinner:start');

		//Default call to API
		$scope.init = function() {
			restService
				.getBooksWithSearch()
				.success(function(response) {
					$log.debug(response);
					$scope.allBooks = response.books;
					$scope.$emit('spinner:stop');

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
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		$scope.init();


		$scope.pageChanged = function() {
			$scope.$emit('spinner:start');

			$rootScope.bookSearchQuery.page = $scope.currentPage;
			$log.debug($rootScope.bookSearchQuery);

			// operation to perform on page changed
			restService
				.getBooksWithSearch($rootScope.bookSearchQuery)
				.success(function(response) {
					$log.debug(response);
					$scope.allBooks = response.books;
					$scope.$emit('spinner:stop');
				})
				.error(function(data, status) {
					$log.debug(data);
				})
				.finally(function() {
					$log.debug('Finally change page');
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		// Search with search form
		$scope.search = function(data) {
			$log.debug($scope.booksSearch);
			$log.debug(data);
			if(typeof $scope.booksSearch !== 'undefined') {
				$rootScope.bookSearchQuery = $scope.booksSearch;
			}
			$scope.$emit('spinner:start');
			restService
				.getBooksWithSearch($scope.booksSearch)
				.success(function(response) {
					$log.debug(response);
					$scope.allBooks = response.books;
					$scope.currentPage = 1;
					$scope.totalItems = response.totalItems;
					$scope.numPages = response.pageCount;
					$scope.$emit('spinner:stop');
				})
				.error(function(data, status) {
					$log.debug(data);
				})
				.finally(function() {
					$log.debug('Finally search with query');
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		// Modal creation function
		vm.open = function(size, type, data, parentSelector) {
			var parentElem = parentSelector
				? angular.element($document[0].querySelector('.modal-demo ' + parentSelector))
				: undefined;

			switch (type) {
				case 'createBook':
					vm.options.controller = 'CreateBookModal';
					vm.options.templateUrl = 'js/createBookModal/CreateBookModal.html';
					break;
				case 'editBook':
					vm.options.controller = 'EditBookModal';
					vm.options.templateUrl = 'js/editBookModal/EditBookModal.html';
					break;
				case 'deleteBook':
					vm.options.controller = 'DeleteBookModal';
					vm.options.templateUrl = 'js/deleteBookModal/DeleteBookModal.html';
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
					data: function() {
						return data;
					}
				}
			});

			modalInstance.result.then(
				function() {
					$scope.init();
				},
				function() {
					$scope.init();
					$log.info('Modal dismissed at: ' + new Date());
				}
			);
		};
	}
})();
