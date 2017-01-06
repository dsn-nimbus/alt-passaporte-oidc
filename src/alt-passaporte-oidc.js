;(function(ng) {
  "use strict";

  ng.module('alt.passaporte.oidc', [])
    .constant('ALT_CHAVE_TOKENS', 'alt.passaporte.tokens')
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('altAutorizacaoInterceptor');
    }])
    .provider('altPassaporteBaseUrlServidorAutorizacao', [function() {
      this.url = '';

      this.$get = [function() {
        return this.url;
      }];
    }])
    .provider('altAutorizacaoInterceptor', [function() {
      this.status = 401;
      this.cb = ng.noop;

      this.$get = ['$q', 'ALT_CHAVE_TOKENS', function($q, ALT_CHAVE_TOKENS) {
        return {
          request: function(config) {
            return config;
          },
          response: function(resp) {
            return resp;
          },
          responseError: function(rej) {
            return $q.reject(rej);
          }
        }
      }]
    }])
    .factory('altRetornaQueryString', ['$location', function($location) {
        return function() {
          return $location.search();
        }
    }])
}(window.angular));
