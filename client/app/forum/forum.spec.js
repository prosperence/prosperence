'use strict';

describe('Controller: ForumCtrl', function () {

  // load the controller's module
  beforeEach(module('prosperenceApp'));
  beforeEach(module('socketMock'));

  var ForumCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/questions').respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    ForumCtrl = $controller('ForumCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of question to the scope', function () {
    // $httpBackend.flush();
    expect(scope.currentQuestions.length).toBe(0);
  });
});
