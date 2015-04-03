'use strict';

angular.module('prosperenceApp')
.controller('DebtBalanceProgressChartCtrl', function ($scope, Auth) {
  var debts = $scope.plan.debts;
  var totalDebt = 0;

  // TODO: Move this logic to a server process.
  var data = [];
  function buildData() {
    for (var key in debts) {
      for (var i=0, n=debts[key].length; i<n; i++) {
        totalDebt += debts[key][i].amount;
        data.push({
          name: debts[key][i]['name'],
          data: reductionProjection(debts[key][i])
        });
      }
    }
  };

  // These cals are entirely made up and insignificant atm. Just placeholder data.
  function reductionProjection(debt) {
    var results = [];
    var balance = debt['amount'];
    var payment = debt['minPay'] || debt['rate'] / 100 * debt['amount']; // This is a made up number.
    while (balance > 0) {
      balance *= (1 + debt['rate'] / 12 / 100);
      payment *= (1 + results.length/100);
      results.push(Math.max(0, Math.floor(balance -= payment)));
    }
    return results;
  };
  buildData();

  // Build the chart
  $('#debt-balance-over-time-chart').highcharts({
    title: {
      text: 'Debt Reduction Projection',
      x: -20 //center
    },
    xAxis: {
      title: {
        text: 'Months'
      }
    },
    yAxis: {
      title: {
        text: 'Balance'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valuePrefix: '$'
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      borderWidth: 0
    },
    series: data
  });
});
