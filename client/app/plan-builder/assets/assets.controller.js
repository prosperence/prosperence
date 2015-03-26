'use strict';

angular.module('prosperenceApp')
.controller('AssetsCtrl', function ($scope) {
  $scope.user.plan.assets = $scope.user.plan.assets || {};

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;

  // Array of question objects to be asked in the 'Net Worth' section.
  $scope.queries = [{
    title: 'Fixed Assets',
    question: "Please enter your fixed assets (checking/savings accounts, CDs, cash, etc.) If you don't have any, feel free to move to the next section.",
    bind: 'assets.fixed',
    type: 'table',
    fields: [{
      label: 'Asset Name',
      value: 'name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Value',
      value: 'amount',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Variable Assets',
    question: "Please enter your variable assets (401k, 403b, IRA, Roth IRA, brokerage account, etc.) If you don't have any, feel free to move to the next section.",
    bind: 'assets.variable',
    type: 'table',
    fields: [{
      label: 'Asset Name',
      value: 'name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Value',
      value: 'amount',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Personal Assets',
    question: "These are the kind of assets you may not normally consider, things like your house, car, etc. If you don't have any, feel free to move to the next section.",
    bind: 'assets.personal',
    type: 'table',
    fields: [{
      label: 'Asset Name',
      value: 'name',
      type: 'text',
      textAlign: 'left',
      required: true
    }, {
      label: 'Value',
      value: 'amount',
      type: 'number',
      textAlign: 'right',
      required: true
    }]
  }, {
    title: 'Primary Residence',
    type: 'multi',
    bind: 'mortgage',
    subqueries: [{
      question: 'Do you own a home?',
      type: 'select',
      bind: 'hasPrimaryResidence',
      options: [{
        text: 'Yes',
        value: true
      }, {
        text: 'No',
        value: false
      }]
    }, {
      question: 'What is the approximate current market value of your home?',
      type: 'number',
      bind: 'homeValue',
      condition: 'hasPrimaryResidence'
    }, {
      question: 'Do you have a mortgage for your primary residence?',
      type: 'select',
      bind: 'hasMortgage',
      options: [ { text:'Yes', value:true }, { text:'No', value:false } ]
    }, {
      question: 'What is the current balance owed on your mortgage?',
      type: 'number',
      bind: 'currentBalance',
      condition: 'hasMortgage'
    }, {
      question: 'What is the interest rate on your mortgage?',
      type: 'number',
      bind: 'currentRate',
      condition: 'hasMortgage'
    }, {
      question: 'What is the term of your mortgage (in years)?',
      type: 'number',
      bind: 'currentTerm',
      condition: 'hasMortgage'
    }, {
      question: 'What was the principal, or balance owed, of your mortgage initially or when you last refinanced (whichever was more recent)?',
      type: 'number',
      bind: 'initialBalance',
      condition: 'hasMortgage'
    }, {
      question: 'When did you purchase or last refinance your home (whichever was most recent)?',
      type: 'month',
      bind: 'startDate',
      condition: 'hasMortgage'
    }]
  }];

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
