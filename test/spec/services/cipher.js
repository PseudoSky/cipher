'use strict';

describe('Service: Cipher', function () {

  // load the service's module
  beforeEach(module('v2App'));

  // instantiate service
  var Cipher;
  beforeEach(inject(function (_Cipher_) {
    Cipher = _Cipher_;
  }));

  it('should do something', function () {
    expect(!!Cipher).toBe(true);
  });

});
