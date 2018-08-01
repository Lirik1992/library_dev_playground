(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('EditUserModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			EditUserModal
		]);

	function EditUserModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;
		vm.user = data;

		$log.debug(data);

		$scope.ok = function() {
			$scope.loading = true;
      $log.debug(vm.user);
      if(vm.user.promote === true) {
        vm.user.roles = ["USER", "ADMIN"]
			}
			$scope.$emit('spinner:start');
			restService.updateUser(vm.user).then(
				function(response) {
					$log.debug(response);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Librarian has been successfully updated');
					$uibModalInstance.close();
				},
				function(error) {
					$log.debug(error);
					$scope.loading = false;
					$scope.$emit('spinner:stop');
					toasterService.getConfiguredToaster('error', 'Error ' + error.status, error.data.message);
				}
			);
		};

		vm.cancel = function() {
			$uibModalInstance.close();
		};
	}
})();