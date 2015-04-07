'use strict';

angular.module('prosperenceApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('forum', {
    url: '/forum',
    templateUrl: 'app/forum/forum.html',
    controller: 'ForumCtrl'
  });
});
