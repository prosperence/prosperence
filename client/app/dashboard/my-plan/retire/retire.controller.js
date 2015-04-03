'use strict';

angular.module('prosperenceApp')
.controller('RetirementCtrl', function ($scope, User, Auth) {
  $scope.user = $scope.user || Auth.getCurrentUser();
  $scope.plan = $scope.plan || $scope.user.plan;

  // Array of planels to display on the retirement page.
  $scope.retirementPlanels = [
    'retirement-savings-growth-chart'
  ];

});
