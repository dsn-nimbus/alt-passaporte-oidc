;(function(ng) {
  "use strict";

  ng.module('alt.passaporte.oidc', [])
    .provider('AltPassaporteBaseUrlServidorAutorizacao', [function() {
      this.url = '';

      this.$get = [function() {
        return this.url;
      }];
    }])
    .factory('altQueryString', ['$location', function($location) {
        return function() {
          return $location.search();
        }
    }]);
}(window.angular));
