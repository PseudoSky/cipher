'use strict';

describe('Service: pgp', function () {

  // load the service's module
  beforeEach(module('v2App'));

  // instantiate service
  var pgp;
  beforeEach(inject(function (_pgp_) {
    pgp = _pgp_;
  }));

  it('should do something', function () {
    expect(!!pgp).toBe(true);
  });

});
