"use strict";

describe('alt.passaporte.oidc', function() {
  var _altRetornaQueryString, _location, _altPassaporteBaseUrlServidorAutorizacao,
      _altPassaporteBaseUrlServidorAutorizacaoProvider, _ALT_CHAVE_TOKENS;

  var URL_SERVIDOR_AUTH = 'http://auth.com.br'

  beforeEach(module('alt.passaporte.oidc', function(altPassaporteBaseUrlServidorAutorizacaoProvider) {
      _altPassaporteBaseUrlServidorAutorizacaoProvider = altPassaporteBaseUrlServidorAutorizacaoProvider;
      _altPassaporteBaseUrlServidorAutorizacaoProvider.url = URL_SERVIDOR_AUTH;
  }));

  beforeEach(inject(function($injector) {
    _location = $injector.get('$location');
    _altRetornaQueryString = $injector.get('altRetornaQueryString');
    _altPassaporteBaseUrlServidorAutorizacao = $injector.get('altPassaporteBaseUrlServidorAutorizacao');

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

  describe('altRetornaQueryString', function() {
    it('deve ser uma função', function() {
      expect(typeof(_altRetornaQueryString)).toBe("function");
    })

    it('deve retornar o que vier do location.search', function() {
      var _retornoQuery;

      spyOn(_location, 'search').and.returnValue(_retornoQuery);

      expect(_altRetornaQueryString()).toEqual(_retornoQuery);
    })
  })
});
