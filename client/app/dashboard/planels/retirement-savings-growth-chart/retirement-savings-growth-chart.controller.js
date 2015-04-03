'use strict';

angular.module('prosperenceApp')
.controller('RetirementSavingsChartCtrl', function ($scope) {
  // Retirement Chart Logic
  var ranges = [];
  var averages = [];

  var variableAssets = $scope.sumGroup($scope.plan.assets.variable);

  // Build savings data.
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

  // Calculate user age for start point.
  function calculateAge(birthday) { // birthday is a date
    if (typeof birthday === 'string') {
      var temp = birthday.split('-');
      // Create new date obj from above string.
      var newdate = new Date(temp[0], temp[1], temp[2].slice(0,2));
      birthday = newdate;
    }
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  var start = calculateAge($scope.user.personal.birthdate);

  // Populate rage and averages
  // TODO: Use the actual numbers once the calculations are complete.
  var stdev;
  for (var i=0; i<(120-start); i++) {
    averages.push([
      i,
      (variableAssets * (i*0.08)) + savings
    ]);
    stdev = ((120-i)/(i+1));
    ranges.push([
      i,
      averages[i][1] - (stdev * averages[i][1]),
      averages[i][1] + (stdev * averages[i][1])
    ]);
  }
  // End placeholder retirement calculations

  $('#retirement-savings-growth-chart').highcharts({
    title: {
      text: 'Retirement Savings Projection'
    },
    xAxis: {
      type: 'number',
      title: {
        text: 'Age'
      }
    },
    yAxis: {
      title: {
        text: 'Total Savings'
      }
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    series: [{
      name: 'Projected Savings',
      data: averages,
      zIndex: 1,
      marker: {
        fillColor: 'white',
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[0]
      }
    }, {
      name: 'Standard Deviation',
      data: ranges,
      type: 'arearange',
      lineWidth: 0,
      linkedTo: ':previous',
      color: Highcharts.getOptions().colors[0],
      fillOpacity: 0.3,
      zIndex: 0
    }]
  });
  // hide highcharts.com logo
  $('text[text-anchor=end]').hide();
});
