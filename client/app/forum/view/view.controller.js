'use strict';

angular.module('prosperenceApp')
.controller('QuestionViewCtrl', function ($scope, $rootScope, $state, $http, Auth) {
  $scope.currentQuestion = $scope.currentQuestion || {};
  var qid = $state.params.questionId;

  // Retreive the question object from the database.
  function getQuestion() {
    $http.get('/api/questions/' + qid)
    .success(function(currentQuestion) {
      $scope.currentQuestion = currentQuestion;
    })
    .error(function() {
      console.log('Question not found. Redirecting to main forum page.');
      $state.go('forum.search');
    });
  };
  getQuestion();

  // Go back to the main question search state.
  $scope.goBack = function() {
    $state.go('forum.search');
  };

  // Star or unstar a specific question. Track in user.forum.starred and adjust question rating accordingly.
  $scope.starQuestion = function() {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can star questions.
    if (!Auth.isAdvisor()) {
      if ($scope.user.forum.starred[qid]) {
        delete $scope.user.forum.starred[qid];
        $scope.currentQuestion.rating--;
      } else {
        $scope.user.forum.starred[qid] = true;
        $scope.currentQuestion.rating++;
      }
      $http.put('/api/questions/' + qid, { rating: $scope.currentQuestion.rating });
      $http.put('/api/users/stars', { starred: $scope.user.forum.starred });
    }
  };

  // Handles up/down voting logic.
  var vote = {
    // Upvoted a comment that they already upvoted.
    uptrue: function(comment) {
      delete $scope.user.forum.comments[comment._id];
      comment.rating--;
    },
    // Upvoted a comment that they previously downvoted.
    upfalse: function(comment) {
      $scope.user.forum.comments[comment._id] = true;
      comment.rating += 2;
    },
    // Upvoted a comment that they have no current position on.
    upundefined: function(comment) {
      $scope.user.forum.comments[comment._id] = true;
      comment.rating++;
    },
    // Downvoted a comment that they already upvoted.
    downtrue: function(comment) {
      $scope.user.forum.comments[comment._id] = false;
      comment.rating -= 2;
    },
    // Downvoted a comment that they previously downvoted.
    downfalse: function(comment) {
      delete $scope.user.forum.comments[comment._id];
      comment.rating++;
    },
    // Downvoted a comment that they have no current position on.
    downundefined: function(comment) {
      $scope.user.forum.comments[comment._id] = false;
      comment.rating--;
    }
  };

  // Increment or decriment the rating of comment by one.
  $scope.vote = function(comment, mod) {
    // If user is not logged in, show login modal.
    if (!Auth.isLoggedIn()) return $rootScope.openLoginModal();
    // Only non-advisors can up/downvote comments.
    if (!Auth.isAdvisor()) {
      var updown = mod+$scope.user.forum.comments[comment._id];
      vote[updown](comment);
      $http.put('/api/questions/' + qid, { comments: $scope.currentQuestion.comments });
      $http.put('/api/users/comments', { comments: $scope.user.forum.comments });
    }
  };

  // Adds new comment to the question.
  $scope.addComment = function() {
    $scope.currentQuestion.comments.push({
      name: $scope.user.name,
      rating: 0,
      text: $scope.newComment,
      timestamp: new Date()
    });
    $http.put('/api/questions/' + qid, { comments: $scope.currentQuestion.comments });
  };

  // Delete specific question.
  $scope.deleteQuestion = function() {
    $state.go('forum.search');
    $http.delete('/api/questions/' + qid);
  };

});
