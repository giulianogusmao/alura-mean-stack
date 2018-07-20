angular.module('alurapic')
  .controller('LogoutController', function ($scope, $window, $location) {
    delete $window.sessionStorage.token;
    $location.path('/login');
	});
