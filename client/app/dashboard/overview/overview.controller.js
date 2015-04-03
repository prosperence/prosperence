'use strict';

angular.module('prosperenceApp')
.controller('OverviewCtrl', function ($scope, User, Auth) {
  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;

});
