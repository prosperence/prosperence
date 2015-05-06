'use strict';

describe('Controller: QuestionViewCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));
  beforeEach(module('socketMock'));

  var QuestionViewCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;

    scope = $rootScope.$new();
    QuestionViewCtrl = $controller('QuestionViewCtrl', {
      $scope: scope
    });
  }));

  it('should expect 1 to be 1', function () {
    expect(1).toBe(1);
  });
});
