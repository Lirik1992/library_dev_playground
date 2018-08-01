(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('DeleteUserModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			DeleteUserModal
		]);

	function DeleteUserModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;
		vm.user = data;

		$log.debug(data);

		vm.ok = function() {
			$scope.loading = true;
      restService.deleteUser(vm.user.id)
      .then(
				function(response) {
					$log.debug(response);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Librarian has been successfully deleted');
					$uibModalInstance.close();
				},
				function(error) {
					$log.debug(error);
					$scope.loading = false;
					toasterService.getConfiguredToaster('error', 'Error ' + error.status, error.data.message);
				}
			);
		};

		vm.cancel = function() {
			$uibModalInstance.close();
		};
	}
})();
