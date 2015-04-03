'use strict';

angular.module('prosperenceApp')
.controller('NetWorthCtrl', function ($scope, User, Auth) {
  $scope.user = $scope.user || Auth.getCurrentUser();
  $scope.plan = $scope.plan || $scope.user.plan;


  // Array of planels to display on the net worth page.
  $scope.netWorthPlanels = [
    'net-worth-chart',
    'debt-balance-over-time-chart',
    'net-worth-statement' // TODO: Make nws planel
  ];

});
