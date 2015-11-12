'use strict';

describe('Service: Crypt', function () {

  // instantiate service
  var Crypt,
    init = function () {
      inject(function (_Crypt_) {
        Crypt = _Crypt_;
      });
    };

  // load the service's module
  beforeEach(module('v2App'));

  it('should do something', function () {
    init();

    expect(!!Crypt).toBe(true);
  });

  it('should be configurable', function () {
    module(function (CryptProvider) {
      CryptProvider.setSalutation('Lorem ipsum');
    });

    init();

    expect(Crypt.greet()).toEqual('Lorem ipsum');
  });

});
