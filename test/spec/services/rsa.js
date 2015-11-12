'use strict';

describe('Service: RSA', function () {

  // load the service's module
  beforeEach(module('v2App'));

  // instantiate service
  var RSA;
  beforeEach(inject(function (_RSA_) {
    RSA = _RSA_;
  }));

  it('should do something', function () {
    expect(!!RSA).toBe(true);
  });

});
