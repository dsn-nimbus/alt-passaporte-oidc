;(function(ng) {
  "use strict";

  ng.module('alt.passaporte.oidc', [])
    .constant('ALT_CHAVE_TOKENS', 'alt.passaporte.tokens')
    .constant('ALT_BASE_SERVIDOR_AUTENTICACAO', altAmbienteUrl.getEndpoint('https://passaporte2__ambiente__.alterdata.com.br'))
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('altPassaporteAutorizacaoInterceptor');
    }])
    .provider('altPassaporteAutorizacaoInterceptor', [function() {
      var STATUS_UNAUTHORIZED = 401;
      var STATUS_FORBIDDEN = 403;

      this.cbUnauthorized = ng.noop;
      this.cbForbidden = ng.noop;
      this.urlRedirecionamento = '';

      this.$get = ['$window', '$injector', '$q', 'ALT_CHAVE_TOKENS', 'ALT_BASE_SERVIDOR_AUTENTICACAO', function($window, $injector, $q, ALT_CHAVE_TOKENS, ALT_BASE_SERVIDOR_AUTENTICACAO) {
        var self = this;

        return {
          request: function(config) {
            config.headers['Authorization'] = 'Bearer ' + JSON.parse($window.localStorage.getItem(ALT_CHAVE_TOKENS)).acess_token;

            return config;
          },
          response: function(resp) {
            var _payload = {};
            var _payloadTemAccessToken = resp && ng.isObject(resp.data) && ng.isDefined(resp.data.access_token);
            var _verboCorreto = resp && ng.isObject(resp.config) && (resp.config.method === "POST");
            var _endPointCorreto = resp && ng.isObject(resp.config) && (/(\/token)$/.test(resp.config.url);

            if (_payloadTemAccessToken && _verboCorreto && _endPointCorreto) {
              _payload = JSON.parse($window.localStorage.getItem(ALT_CHAVE_TOKENS));
              _payload.access_token = resp.data.access_token;

              $window.localStorage.setItem(ALT_CHAVE_TOKENS, JSON.stringify(_payload));
            }

            return resp;
          },
          responseError: function(rej) {
            var $http = $injector.get('$http');

            if (rej.status === STATUS_UNAUTHORIZED) {
              self.cbUnauthorized();
              $window.localStorage.removeItem(ALT_CHAVE_TOKENS);
              $window.location.replace(self.urlRedirecionamento);
            } else {
              if (rej.status === STATUS_FORBIDDEN) {
                self.cbForbidden();

                /*return $http.post(ALT_BASE_SERVIDOR_AUTENTICACAO)
                  .catch(function(err) {
                    return $q.reject(err);
                  })
                */
              }
            }

            return $q.reject(rej);
          }
        }
      }]
    }])
    .factory('altPassaporteRetornaQueryString', ['$location', function($location) {
        return function() {
          return $location.search();
        }
    }])
}(window.angular));
