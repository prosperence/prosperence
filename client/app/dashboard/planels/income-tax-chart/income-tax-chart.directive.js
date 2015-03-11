'use strict';

angular.module('prosperenceApp')
.controller('IncomeTaxChartCtrl', function ($scope, Auth) {
  var savings = $scope.sumGroup($scope.plan.contributions);

  // Tax Chart Logic
  // Build the chart
  var taxBreakdownChart = $('#incomeTaxChartContainer').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'Income Tax Analysis'
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          distance: 5,
          enabled: true
        },
        showInLegend: true
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      type: 'pie',
      data: [
        [ 'Federal', $scope.plan.taxProjection.projected.federal ],
        [ 'State and City', $scope.plan.taxProjection.projected.local ],
        [ 'FICA', $scope.sumGroup($scope.plan.taxProjection.projected.fica) ],
        [ 'AMT', $scope.plan.taxProjection.projected.amt ],
        [ 'Net Income', $scope.plan.taxProjection.netIncome + savings ]
      ]
    }]
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();

});
