'use strict';

describe('Controller: QuestionSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));
  beforeEach(module('socketMock'));

  var QuestionSearchCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    QuestionSearchCtrl = $controller('QuestionSearchCtrl', {
      $scope: scope
    });
  }));

  it('should expect 1 to be 1', function () {
    expect(1).toBe(1);
  });
});
