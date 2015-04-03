'use strict';

angular.module('prosperenceApp')
.controller('SpendingCtrl', function ($scope) {
  $scope.user.plan.expenses = $scope.user.plan.expenses || {};

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;

  // Array of question objects to be asked in the 'Spending' section of plan builder.
  $scope.queries = [{
    title: 'Income Information',
    type: 'multi',
    bind: 'income',
    subqueries: [{
      question: 'What is your Gross Annual Income?',
      type: 'number',
      bind: 'grossAnnualW2'
    }, {
      question: 'What is your spouse\'s Gross Annual Income?',
      type: 'number',
      bind: 'spouseGrossAnnualW2',
      condition: $scope.user.personal.married
    }]
  }, {
    title: 'Payroll Deductions',
    type: 'multi',
    bind: 'income',
    subqueries: [{
      question: 'Enter the total deductions from your paycheck (not including retirement contributions):',
      bind: 'userPayrollDeductions',
      type:'number'
    }, {
      question: 'Enter the total deductions from your spouce\'s paycheck (not including retirement contributions):',
      bind: 'spousePayrollDeductions',
      type: 'number',
      condition: $scope.user.personal.married
    }]
  }, {
    title: 'Fixed Expenses',
    type: 'table',
    bind: 'expenses.fixed',
    question: 'Fixed expenses are the ones that you would consider necessary to get by (mortgage payments, groceries, utilities, child care expenses, etc.).',
    fields: [{
      label: 'Fixed Expense Name',
      value: 'name',
      textAlign: 'left',
      type: 'text'
    }, {
      label: 'Monthly Expense',
      value: 'amount',
      textAlign: 'right',
      type: 'number'
    }]
  }, {
    title: 'Flexible Expenses',
    type: 'table',
    bind: 'expenses.flexible',
    question: 'Flexible expenses are the ones that you could live without if you needed to (travel, dining out, etc.) As you may not travel every month, try to approximate by taking your annual travel expense and dividing it by twelve.',
    fields: [{
      label: 'Flexible Expense Name',
      value: 'name',
      textAlign: 'left',
      type: 'text'
    }, {
      label: 'Monthly Expense',
      value: 'amount',
      textAlign: 'right',
      type: 'number'
    }]
  }];
  $scope.setQueries($scope.queries);

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
