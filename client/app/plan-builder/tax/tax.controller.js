'use strict';

angular.module('prosperenceApp')
.controller('TaxProjectionCtrl', function ($scope) {

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;

  $scope.queries = [{
    title: 'Income Tax Considerations',
    type: 'multi',
    bind: 'tax',
    subqueries: [{
      question:"What is your tax filing status?",
      type:'select',
      bind:'filingStatus',
      options: [
        {text:'Single', value:'single' },
        {text:'Married Filing Jointly', value:'married' },
        {text:'Head of Household', value:'headOfHouse' }
      ]
    }, {
      question:"How many dependents do you intend to declare this year?",
      type:'number',
      bind:'dependents'
    }, {
      question:"What are your total annual charitable contributions?",
      type:'number',
      bind:'charitableContributions'
    }, {
      question:"Please enter any other tax deductions here:",
      type:'number',
      bind:'otherDeductions'
    }]
  }];
  $scope.setQueries($scope.queries);

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
