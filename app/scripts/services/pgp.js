'use strict';

/**
 * @ngdoc service
 * @name v2App.pgp
 * @description
 * # pgp
 * Factory in the v2App.
 */
angular.module('v2App')
  .factory('pgp', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
