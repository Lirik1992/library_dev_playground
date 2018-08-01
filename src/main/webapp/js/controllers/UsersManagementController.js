(function() {
	'use strict';

	angular
		.module('mainApp')
		.controller('UsersManagementController', [
			'$scope',
			'restService',
			'toasterService',
			'$log',
			'$location',
			'Auth',
			'$uibModal',
			UsersManagementController
		]);

	function UsersManagementController($scope, restService, toasterService, $log, $location, Auth, $uibModal) {
		var vm = this;

		// Check if user is logged in, and redirect to Login page if not
		if (!Auth.isLoggedIn) {
			$location.path('/');
		}

		// Empty object for modal properties
		vm.options = {};

		//Loading state on table
		$scope.$emit('spinner:start');

		//Default call to API
		$scope.init = function() {
			restService
				.getUsers()
				.success(function(response) {
					$log.debug(response);
					$scope.allUsers = response;
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

			// operation to perform on page changed
			restService
				.getUsers($scope.currentPage)
				.success(function(response) {
					$log.debug(response);
					$scope.allUsers = response;
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

		// Modal creation function
		vm.open = function(size, type, data, parentSelector) {
			var parentElem = parentSelector
				? angular.element($document[0].querySelector('.modal-demo ' + parentSelector))
				: undefined;

			switch (type) {
				case 'createUser':
					vm.options.controller = 'CreateUserModal';
					vm.options.templateUrl = 'js/createUserModal/CreateUserModal.html';
					break;
				case 'editUser':
					vm.options.controller = 'EditUserModal';
					vm.options.templateUrl = 'js/editUserModal/EditUserModal.html';
					break;
				case 'deleteUser':
					vm.options.controller = 'DeleteUserModal';
					vm.options.templateUrl = 'js/deleteUserModal/DeleteUserModal.html';
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
