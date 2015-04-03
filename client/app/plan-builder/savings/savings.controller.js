'use strict';

angular.module('prosperenceApp')
.controller('SavingsCtrl', function ($scope) {

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;

  // Build list of accounts that the user can make contributions to.
  var accountList = (function() {
    var list = [];
    var options = $scope.user.plan.assets.fixed.slice().concat($scope.user.plan.assets.variable.slice());
    for (var i=0, n=options.length; i<n; i++) {
      list.push(options[i].name);
    }
    return list;
  })();

  // Options for periodic contributions
  var contributionOptions = ['Weekly', 'Monthly', 'Semi-Annually', 'Annually'];

  // Array of question objects to be asked in the 'Savings' section.
  $scope.queries = [{
    title: 'Emergency Reserve',
    question: 'Please enter your emergency reserve savings information.',
    type: 'table',
    bind: 'contributions.reserves',
    fields: [{
      label: 'Account Name', // This should be one of their savings accounts.
      value: 'name',
      type: 'select',
      options: accountList
    }, {
      label: 'Contribution',
      value: 'amount',
      type: 'number'
    }, {
      label: 'Frequency',
      value: 'frequency',
      type: 'select',
      options: contributionOptions
    }]
  }, {
    title: 'Early Retirement Savings',
    question: 'Please enter your non-retirement account contributions.',
    type: 'table',
    bind: 'contributions.earlyRetirement',
    fields: [{
      label: 'Account Name',
      value: 'name',
      type: 'select',
      options: accountList
    }, {
      label: 'Contribution',
      value: 'amount',
      type: 'number'
    }, {
      label: 'Frequency',
      value: 'frequency',
      type: 'select',
      options: contributionOptions
    }]
  }, {
    title: 'Retirement Savings',
    question: 'Please enter your retirement account contributions.',
    type: 'table',
    bind: 'contributions.retirement',
    fields: [{
      label: 'Account Name',
      value: 'name',
      type: 'select',
      options: accountList
    }, {
      label: 'Contribution',
      value: 'amount',
      type: 'number'
    }, {
      label: 'Frequency',
      value: 'frequency',
      type: 'select',
      options: contributionOptions
    }]
  }];
  $scope.setQueries($scope.queries);

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
