// NOTE: While the other views of My-Plan are comprised of planels, this section should not be. Instead, this section
// should contain (artistic, beautiful, etc.) links to other non-core plan items (college savings, student loans, etc.)

'use strict';

angular.module('prosperenceApp')
.controller('MyPlanMoreCtrl', function ($scope, User, Auth) {
  $scope.user = $scope.user || Auth.getCurrentUser();
  $scope.plan = $scope.plan || $scope.user.plan;

  //
});
