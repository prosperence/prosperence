'use strict';

angular.module('prosperenceApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('search', {
    url: '/search',
    templateUrl: 'app/search/search.html',
    controller: 'SearchCtrl'
  });
});
