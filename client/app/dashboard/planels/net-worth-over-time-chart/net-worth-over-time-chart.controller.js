'use strict';

// TODO: Attach this graph to actual data.
angular.module('prosperenceApp')
.controller('NetWorthProgressChartCtrl', function ($scope, Auth) {

  var assets = totalGroups($scope.plan.assets);
  var debts = -1 * totalGroups($scope.plan.debts);

  function totalGroups(target) {
    var total = 0;
    for (var key in target) {
      for (var sub in target[key]) {
        total += target[key][sub]['amount'];
      }
    }
    return total;
  }

  $('#net-worth-over-time-chart').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Net Worth Over Time'
    },
    xAxis: {
      categories: [ '2011', '2012', '2013', '2014' ]
    },
    yAxis: {
      title: {
        text: 'Total Balance'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Assets',
      data: [assets*0.78, assets*0.86, assets*0.94, assets]
    }, {
      name: 'Debts',
      data: [debts*1.18, debts*1.12, debts*1.06, debts]
    }]
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();

});
