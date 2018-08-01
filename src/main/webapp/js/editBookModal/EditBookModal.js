(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('EditBookModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			EditBookModal
		]);

	function EditBookModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;
		vm.book = data;

		$log.debug(data);

		vm.ok = function() {
			$scope.loading = true;
			$log.debug(vm.book);
			$scope.$emit('spinner:start');
			restService.updateBook(vm.book).then(
				function(response) {
					$log.debug(response);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Book has been successfully updated');
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
