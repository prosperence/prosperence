'use strict';

angular.module('prosperenceApp')
.controller('MyPlanCtrl', function ($scope, User, Auth) {
  $scope.user = $scope.user || Auth.getCurrentUser();
  $scope.plan = $scope.plan || $scope.user.plan;

  // Check highcharts menu and update if needed. This line must be lower than the last highchart.
  $scope.updateChartMenu();
});
