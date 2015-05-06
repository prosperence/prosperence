'use strict';

angular.module('prosperenceApp')
.controller('ForumCtrl', function ($scope, $rootScope, $http, socket, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.user.forum = $scope.user.forum || {};
  $scope.user.forum.starred = $scope.user.forum.starred || {};
  $scope.user.forum.comments = $scope.user.forum.comments || {};
  $scope.currentQuestions = [];

  $scope.categories = ['Debt Management', 'Retirement Savings', 'Investing', 'Life Insurance', 'Health Insurance', 'Disability Insurance'];

  // Get list of questions from the database.
  // Reset question view to default view.
  $scope.defaultView = function() {
    $http.get('/api/questions').success(function(data) {
      $scope.currentQuestions = data;
      socket.syncUpdates('question', $scope.currentQuestions);
    });
  };
  $scope.defaultView();

  // Display questions authored by the current user.
  $scope.displayMyQuestions = function() {
    $http.get('/api/questions/mine/' + $scope.user._id).success(function(data) {
      $scope.currentQuestions = data;
      socket.syncUpdates('question', $scope.currentQuestions);
    });
  };

  // Display questions that the user has starred.
  $scope.displayStarredQuestions = function() {
    $http.get('/api/questions/starred/' + JSON.stringify(Object.keys($scope.user.forum.starred))).success(function(data) {
      $scope.currentQuestions = data;
      socket.syncUpdates('question', $scope.currentQuestions);
    });
  };

  // Search for questions in database and display those questions.
  $scope.searchByKeyword = function() {
    var keywords = JSON.stringify($scope.keywords.split(' '));
    $http.get('/api/questions/search/' + keywords).success(function(data) {
      $scope.currentQuestions = data;
      socket.syncUpdates('question', $scope.currentQuestions);
    });
  };

  // Delete specific question.
  $scope.deleteQuestion = function(question) {
    $http.delete('/api/questions/' + question._id);
  };

  // Update sockets when question is deleted.
  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('question');
  });

  // Directs user to login or to the input to submit a new question.
  $scope.askNewQuestion = function() {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // If user is logged in, then set focus to the 'ask question' input field.
    else $('#newQuestion').focus();
  };

});
