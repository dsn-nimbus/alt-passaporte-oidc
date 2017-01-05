;(function(ng) {
  "use strict";

  ng.module('alt.passaporte.oidc', [])
    .service('GreetingService', [function GreetingService() {
        this.sayHello = function() {
           return "hello there!";
        };
      }]);
}(window.angular));
