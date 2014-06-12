'use strict';

describe('Service: ContactAPI', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var ContactAPI;
  beforeEach(inject(function (_ContactAPI_) {
    ContactAPI = _ContactAPI_;
  }));

  it('should do something', function () {
    expect(!!ContactAPI).toBe(true);
  });

});
