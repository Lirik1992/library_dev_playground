(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('CreatePupilModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			CreatePupilModal
		]);

	function CreatePupilModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;

		$scope.submitted = false;
		$log.debug(data);

		$scope.ok = function(data) {
			$log.debug($scope.newPupil);
			$log.debug(data);
			$scope.loading = true;
			$scope.submitted = true;

			restService
				.createPupil($scope.newPupil)
				.success(function(data) {
					$log.debug(data);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Pupil has been created');
				})
				.error(function(data, status) {
					$log.debug(data);
					$log.debug(status);
					$scope.loading = false;
					toasterService.getConfiguredToaster('error', 'Error', 'Failed to create new pupil');
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
