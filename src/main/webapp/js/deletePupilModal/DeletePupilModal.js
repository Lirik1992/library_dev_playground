(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('DeletePupilModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			DeletePupilModal
		]);

	function DeletePupilModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;
		vm.pupil = data;

		$log.debug(data);

		vm.ok = function() {
			$scope.loading = true;
      restService.deletePupilById(vm.pupil.id)
      .then(
				function(response) {
					$log.debug(response);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Pupil has been successfully deleted');
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
