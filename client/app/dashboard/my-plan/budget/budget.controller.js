'use strict';

angular.module('prosperenceApp')
.controller('BudgetCtrl', function ($scope, User, Auth) {
  $scope.user = $scope.user || Auth.getCurrentUser();
  $scope.plan = $scope.plan || $scope.user.plan;

  // Array of planels to display on the budget page.
  $scope.budgetPlanels = [
    'cash-flow-chart',
    'income-tax-chart',
    'cash-flow-analysis' // TODO: Make cash flow analysis planel
  ];

});
