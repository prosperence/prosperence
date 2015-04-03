'use strict';

angular.module('prosperenceApp')
.controller('InsuranceCtrl', function ($scope, User, Auth) {
  $scope.user = $scope.user || Auth.getCurrentUser();
  $scope.plan = $scope.plan || $scope.user.plan;

  // Array of planels to display on the insurance page.
  $scope.insurancePlanels = [
    // TODO: Make insurance planels.
  ];

});
