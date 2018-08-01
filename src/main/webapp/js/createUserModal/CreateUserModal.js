(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('CreateUserModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			CreateUserModal
		]);

	function CreateUserModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;

		$scope.toggleShowPassword = function() {
			$scope.showPassword = !$scope.showPassword;
		};

		$scope.ok = function(data) {
      $log.debug($scope.newUser);
      if($scope.newUser.promote === true) {
        $log.debug('ADMIIIIIIN');
        $scope.newUser.roles = ['ADMIN'];
      }
			$log.debug(data);
			$scope.loading = true;
			restService
				.createUser($scope.newUser)
				.success(function(data) {
					$log.debug(data);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'New librarian has been created');
				})
				.error(function(data, status) {
					$log.debug(data);
					$log.debug(status);
					$scope.loading = false;
					toasterService.getConfiguredToaster('error', 'Error', 'Failed to create new librarian');
				})
				.finally(function() {
					$log.debug('Finally create!!');
				})
				.catch(function(error) {
					$log.debug(error);
				});
		};

		vm.cancel = function() {
			$uibModalInstance.close();
		};
	}
})();
