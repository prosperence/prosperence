'use strict';

angular.module('prosperenceApp')
.controller('ProgressCtrl', function ($scope) {

  // Array of planels to display on the budget page.
  $scope.progressPlanels = [
    'net-worth-over-time-chart' // TODO: Make this
    // 'debt-balance-over-time-chart' // TODO: Make this
  ];

});
