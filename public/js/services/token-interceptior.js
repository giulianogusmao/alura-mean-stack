angular.module('alurapic')
  .factory('tokenInterceptor', function($window, $q, $location) {
    var interceptor = {};

    interceptor.response = function(response) {
      var token = response.headers('x-access-token');

      if (token) {
        $window.sessionStorage.token = token;
      }
      return response;
    }

    interceptor.request = function (config) {
      config.headers = config.headers || {};
      var token = $window.sessionStorage.token;

      if (token) {
        console.log('add token ' + token);
        config.headers['x-access-token'] = token;
      }
      return config;
    }

    interceptor.responseError = function(rejection) {
      if (rejection != null && rejection.status == 401) {
        delete $window.sessionStorage.token;
        $location.path('/login');
      }

      return $q.reject(rejection);
    }

    return interceptor;
  });
