"use strict";

describe('alt.passaporte.oidc', function() {
  var _altQueryString, _location, _AltPassaporteBaseUrlServidorAutorizacaoProvider;
  var URL_SERVIDOR_AUTH = 'http://auth.com.br'

  beforeEach(module('alt.passaporte.oidc', function(AltPassaporteBaseUrlServidorAutorizacaoProvider) {
      _AltPassaporteBaseUrlServidorAutorizacaoProvider = AltPassaporteBaseUrlServidorAutorizacaoProvider;
  }));

  beforeEach(inject(function($injector) {
    _location = $injector.get('$location');
    _altQueryString = $injector.get('altQueryString');

    _AltPassaporteBaseUrlServidorAutorizacaoProvider.url = URL_SERVIDOR_AUTH;
  }));

  describe('altQueryString', function() {
    it('deve ser uma função', function() {
      expect(typeof(_altQueryString)).toBe("function");
    })

    it('deve retornar o que vier do location.search', function() {
      var _retornoQuery;

      spyOn(_location, 'search').and.returnValue(_retornoQuery);

      expect(_altQueryString()).toEqual(_retornoQuery);
    })
  })
});
