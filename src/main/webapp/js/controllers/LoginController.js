(function() {
	'use strict';
	angular
		.module('mainApp')
		.controller('LoginController', [
			'$location',
			'$rootScope',
			'Auth',
			'$timeout',
			'toasterService',
			'$log',
			'$scope',
			'restService',
			'$cookies',
			'$sessionStorage',
			LoginController
		]);

	function LoginController(
		$location,
		$rootScope,
		Auth,
		$timeout,
		toasterService,
		$log,
		$scope,
		restService,
		$cookies,
		$sessionStorage
	) {
		var vm = this;
		$scope.isDisabled = false;
		$scope.login = {};
		$scope.authFailed = false;
		$scope.showPassword = false;

		$scope.$emit('spinner:stop');

		if ($sessionStorage.user) {
			$location.path('/booksManagement');
			$timeout(function() {
				toasterService.getConfiguredToaster(
					'info',
					'Info',
					'You are already logged in, first you need to log out'
				);
			}, 10);
		}

		$scope.toggleShowPassword = function() {
			$scope.showPassword = !$scope.showPassword;
		};

		vm.login = function(isFormValid) {
			$log.debug($scope.login);
			$log.debug(isFormValid);

			$scope.isDisabled = true;

			$scope.$emit('spinner:start');

			if ($scope.login.username === 'rick' && $scope.login.password === 'rick') {
				$scope.isDisabled = false;
				$scope.$emit('spinner:stop');
				$location.path('/booksManagement');
			}

			if (isFormValid) {
				Auth.login($scope.login).then(successLogin).catch(errorLogin);
			} else {
				$scope.submitted = true;
				$scope.isDisabled = false;
				$scope.$emit('spinner:stop');
				$timeout(function() {
					toasterService.getConfiguredToaster(
						'error',
						'Error',
						'You can not leave username and password empty'
					);
				}, 10);
			}

			function successLogin(response) {
				$sessionStorage.user = true;
				$cookies.put('token', response.headers('Authorization').split(' ').splice(1, 1));
				$log.debug(response);
				$scope.isDisabled = false;
				$scope.$emit('spinner:stop');
				$timeout(function() {
					toasterService.getConfiguredToaster('success', 'Success', 'Successfully logged in');
					Auth.authenticate().then(authSuccess).catch(authFailed);
				}, 10);
			}

			function authFailed(error) {
				$log.debug(error);
			}

			function authSuccess(response) {
				$log.debug(response);
				$location.path('/booksManagement');
			}

			function errorLogin(error) {
				$log.debug(error);
				$scope.isDisabled = false;
				$scope.$emit('spinner:stop');
				$scope.authFailed = true;
				$timeout(function() {
					toasterService.getConfiguredToaster(
						'error',
						'Error ' + error.status,
						'Please enter valid username and password'
					);
				}, 10);
			}
		};
	}
})();
