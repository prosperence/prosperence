'use strict';

angular.module('prosperenceApp')
.controller('QuestionSearchCtrl', function ($scope, $rootScope, $state, $http, Auth) {

  // View specific question.
  $scope.viewQuestion = function(question) {
    $state.go('forum.view', { questionId: question._id });
  };

  // Submit a new question.
  $scope.addQuestion = function() {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can post questions.
    if (!Auth.isAdvisor()) {
      if ($scope.newQuestion.split(' ').length < 4) {
        // Require questions to be at least 4 words long.
        alert('Questions that are more specific are more likely to get better responses. Please be a little more specific with your question.')
      } else if (!!allCaps($scope.newQuestion)) {
        // Require questions to NOT be in all caps.
        alert('Please avoid using all caps when asking questions.');
      } else {
        $http.post('/api/questions', {
          text: $scope.newQuestion,
          author: Auth.getCurrentUser().name,
          authorID: Auth.getCurrentUser()._id,
          rating: 0,
          timestamp: new Date()
        });
        $scope.newQuestion = '';
      }
    }
  };

  // Returns true if string is all caps, false otherwise.
  function allCaps(str) {
    return str.toUpperCase() === str;
  };

});
