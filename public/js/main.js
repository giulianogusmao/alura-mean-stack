angular.module('alurapic', ['minhasDiretivas','ngAnimate', 'ngRoute', 'ngResource', 'meusServicos'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('tokenInterceptor');

		$routeProvider.when('/fotos', {
			templateUrl: 'partials/principal.html',
			controller: 'FotosController'
		});

		$routeProvider.when('/fotos/new', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController'
		});

		$routeProvider.when('/fotos/edit/:fotoId', {
			templateUrl: 'partials/foto.html',
			controller: 'FotoController'
		});

    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginsController'
    });

    $routeProvider.when('/logout', {
      template: " ",
      controller: 'LogoutController'
    });

    $routeProvider.when('/registrar', {
      templateUrl: 'partials/register.html',
      controller: 'RegisterController'
    });

		$routeProvider.otherwise({redirectTo: '/fotos'});

	});
