"use strict";

describe('alt.passaporte.oidc', function() {
  var _altPassaporteRetornaQueryString, _location, _altPassaporteBaseUrlServidorAutorizacao,
      _altPassaporteBaseUrlServidorAutorizacaoProvider, _ALT_CHAVE_TOKENS, _altPassaporteAutorizacaoInterceptor;

  var URL_SERVIDOR_AUTH = 'http://auth.com.br'

  beforeEach(module('alt.passaporte.oidc'));

  beforeEach(inject(function($injector) {
    _location = $injector.get('$location');
    _altPassaporteRetornaQueryString = $injector.get('altPassaporteRetornaQueryString');
    _altPassaporteBaseUrlServidorAutorizacao = $injector.get('altPassaporteBaseUrlServidorAutorizacao');
    _altPassaporteAutorizacaoInterceptor = $injector.get('altPassaporteAutorizacaoInterceptor');
    _ALT_CHAVE_TOKENS = $injector.get('ALT_CHAVE_TOKENS');
  }));

  describe('ALT_CHAVE_TOKENS', function() {
    it('deve ter o valor correto para a constante de tokens', function() {
      expect(_ALT_CHAVE_TOKENS).toEqual('alt.passaporte.tokens')
    })
  })

  describe('altPassaporteBaseUrlServidorAutorizacao', function() {
    it('deve ter o valor correto para a url', function() {
      expect(_altPassaporteBaseUrlServidorAutorizacao).toEqual(URL_SERVIDOR_AUTH);
    })
  })

  describe('altPassaporteAutorizacaoInterceptor', function() {
    describe('default props', function() {
      it('deve ter os valores default para as propriedades do interceptor', function() {
        expect(_altPassaporteAutorizacaoInterceptor.urlRedirecionamento).toEqual('');
        expect(_altPassaporteAutorizacaoInterceptor.cbUnauthorized).toEqual(angular.noop);
        expect(_altPassaporteAutorizacaoInterceptor.cbForbidden).toEqual(angular.noop);
      })
    })

    describe('request', function() {
      it('deve modificar o cabecalho do config corretamente - pegando o que vem da storage', function() {
        var _config = {
          headers: {

          }
        }

        var _tokenStorage = {
          access_token: 'abc123'
        }

        spyOn(_window.localStorage, 'getItem').and.returnValue(_tokenStorage)

        _altPassaporteAutorizacaoInterceptor.request(_config);

        expect(_config.headers['Authorization']).toEqual('Bearer ' + _tokenStorage)
      })
    })

    describe('response', function() {

    })

    describe('responseError', function() {

    })
  })

  describe('altPassaporteRetornaQueryString', function() {
    it('deve ser uma função', function() {
      expect(typeof(_altPassaporteRetornaQueryString)).toBe("function");
    })

    it('deve retornar o que vier do location.search', function() {
      var _retornoQuery;

      spyOn(_location, 'search').and.returnValue(_retornoQuery);

      expect(_altPassaporteRetornaQueryString()).toEqual(_retornoQuery);
    })
  })
});
