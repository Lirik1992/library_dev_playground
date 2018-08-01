(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('CreateBookModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			CreateBookModal
		]);

	function CreateBookModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;

		$scope.submitted = false;
		$log.debug(data);

		$scope.ok = function(data) {
			$log.debug($scope.newBook);
			$log.debug(data);
			$scope.loading = true;
			$scope.submitted = true;

			restService
				.createBook($scope.newBook)
				.success(function(data) {
					$log.debug(data);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Book has been created');
				})
				.error(function(data, status) {
					$log.debug(data);
					$log.debug(status);
					$scope.loading = false;
					toasterService.getConfiguredToaster('error', 'Error ');
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
