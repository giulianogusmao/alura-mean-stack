angular.module('alurapic')
  .controller('RegisterController', function ($scope, $http, $location) {

    $scope.usuario = {};
    $scope.mensagem = '';

    $scope.registrar = function() {
      var usuario = $scope.usuario;

      if (!usuario.login) {
        $scope.mensagem = 'Login é obrigatório!';
        return;
      }

      if (!usuario.senha) {
        $scope.mensagem = 'senha é obrigatório!';
        return;
      }

      if (!usuario.confSenha) {
        $scope.mensagem = 'Confirmar senha é obrigatório!';
        return;
      }

      if (usuario.senha !== usuario.confSenha) {
        $scope.mensagem = 'A confirmação de senha não bate!';
        return;
      }

      $http
        .post('/user', { login: usuario.login, senha: usuario.senha })
        .then(
          function() { $location.path('/login'); },
          function(error) {
            console.error(error);
            $scope.mensagem = 'Não foi possivel registrar usuário!';
          }
        );
    };
	});
