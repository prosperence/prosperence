'use strict';

angular.module('prosperenceApp')
.controller('CashFlowChartCtrl', function ($scope, Auth) {

  var expenses = $scope.plan.expenses;

  // Cash Flow Chart Logic
  var fixedExpenses = $scope.sumGroup(expenses.fixed);
  var flexibleExpenses = $scope.sumGroup(expenses.flexible);
  // Build savings data
  var savingsData = [];
  var temp;
  for (var key in $scope.plan.contributions) {
    if (key === 'reserves') temp = 'Emergency Reserves';
    else if (key === 'earlyRetirement') temp = 'Early Retirement';
    else temp = 'Retirement';
    savingsData.push({
      name: temp,
      amount: $scope.sumGroup($scope.plan.contributions[key])
    });
  }
  var savings = $scope.sumGroup(savingsData);
  var totalCashFlowOut = fixedExpenses + flexibleExpenses + savings;

  // http://www.highcharts.com/demo/pie-drilldown
  var topLevelSlices = {
    'Fixed Expenses': null,
    'Flexible Expenses': null,
    'Savings': null
  };
  var sliceData = [{
    drilldown: 'Fixed Expenses',
    name: 'Fixed Expenses',
    visible: true,
    y: (fixedExpenses / totalCashFlowOut) * 100
  }, {
    drilldown: 'Flexible Expenses',
    name: 'Flexible Expenses',
    visible: true,
    y: (flexibleExpenses / totalCashFlowOut) * 100
  }, {
    drilldown: 'Savings',
    name: 'Long-Term Savings',
    visible: true,
    y: (savings / totalCashFlowOut) * 100
  }, {
    drilldown: null,
    name: 'Unallocated Income',
    visible: true,
    y: ($scope.plan.taxProjection.netIncome / 12) / 100
  }];
  // console.log(sliceData)
  var drillDownSlices = [{
    name: 'Fixed Expenses',
    id: 'Fixed Expenses',
    data: $scope.buildHighchartData(expenses.fixed)
  }, {
    name: 'Flexible Expenses',
    id: 'Flexible Expenses',
    data: $scope.buildHighchartData(expenses.flexible)
  }, {
    name: 'Savings',
    id: 'Savings',
    data: $scope.buildHighchartData(savingsData)
  }];

  // Create the chart
  var cashFlowChart = $('#cash-flow-chart').highcharts({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Cashflow Analysis'
    },
    subtitle: {
      text: 'click on a section to see a detailed breakdown'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          distance: 5,
          style: {
            'text-decoration': 'none'
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    series: [{
      name: 'top',
      colorByPoint: true,
      data: sliceData
    }],
    drilldown: {
      series: drillDownSlices
    }
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();
  // End cash flow pie chart.

});
