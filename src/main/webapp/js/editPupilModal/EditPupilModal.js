(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('EditPupilModal', [
			'$scope',
			'$log',
			'$uibModalInstance',
			'restService',
			'toasterService',
			'data',
			EditPupilModal
		]);

	function EditPupilModal($scope, $log, $uibModalInstance, restService, toasterService, data) {
		var vm = this;
		vm.pupil = data;

		$log.debug(data);

		vm.ok = function() {
			$scope.loading = true;
			$log.debug(vm.pupil);
			$scope.$emit('spinner:start');
			restService.updatePupil(vm.pupil).then(
				function(response) {
					$log.debug(response);
					$scope.loading = false;
					toasterService.getConfiguredToaster('success', 'Success', 'Pupil has been successfully updated');
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
