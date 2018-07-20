angular.module('alurapic')
  .controller('LoginsController', function ($scope, $http, $location) {

    $scope.usuario = {};
    $scope.mensagem = '';

    $scope.autenticar = function() {
      var usuario = $scope.usuario;

      $http
        .post('/autenticar', { login: usuario.login, senha: usuario.senha })
        .then(
          function() { $location.path('/'); },
          function(error) {
            console.error(error);
            $scope.mensagem = 'Login ou senha inválidos!';
          }
        );
    };
	});
