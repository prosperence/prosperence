'use strict';

angular.module('prosperenceApp')
.controller('ForumCtrl', function ($scope, $http, socket, Auth) {
  $scope.currentQuestions = [];

  $http.get('/api/questions').success(function(currentQuestions) {
    $scope.currentQuestions = currentQuestions;
    socket.syncUpdates('question', $scope.currentQuestions);
  });

  $scope.categories = [ 'Debt Management', 'Insurance Planning', 'Retirement Savings', 'etc.' ];

  $scope.addQuestion = function() {
    if($scope.newQuestion === '') {
      return;
    }
    $http.post('/api/questions', {
      text: $scope.newQuestion,
      author: Auth.getCurrentUser()
    });
    $scope.newQuestion = '';
  };

  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('question');
  });
});
