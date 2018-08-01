(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('DeleteBookModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			DeleteBookModal
		]);

	function DeleteBookModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;
		vm.book = data;

		$log.debug(data);

		vm.ok = function() {
			$scope.loading = true;
      restService.deleteBookById(vm.book.id)
      .then(
				function(response) {
					$log.debug(response);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Book has been successfully deleted');
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
