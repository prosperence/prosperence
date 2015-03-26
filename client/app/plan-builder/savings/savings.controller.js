'use strict';

angular.module('prosperenceApp')
.controller('SavingsCtrl', function ($scope) {

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;
  
  // Array of question objects to be asked in the 'Savings' section.
  $scope.queries = [{
    title: 'Non-Retirement Savings', // Emergency reserves, 'new home fund', etc.
    type: 'table',
    bind: 'contributions',
    question: 'Please enter your non-retirement account contributions.',
    fields: [{
      label: 'Account Name', // These should be the same as their ER or non-retirement variable asset account names.
      type: 'text'
    }, {
      label: 'Contribution',
      type: 'number'
    }, {
      label: 'Frequency',
      type: 'number' // TODO: This should be a select option.
    }]
  }, {
    title: 'Retirement Savings',
    type: 'table',
    bind: 'contributions',
    question: 'Please enter your retirement account contributions.',
    fields: [{
      label: 'Account Name', // These should be the same as their retirement account names from variable assets.
      type: 'text'
    }, {
      label: 'Contribution',
      type: 'number'
    }, {
      label: 'Frequency',
      type: 'number' // TODO: This should be a select option.
    }]
  }];

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
