'use strict';

angular.module('prosperenceApp')
.controller('DashboardCtrl', function ($scope, $state, User, Auth, CalcsService) {
  $scope.user = Auth.getCurrentUser();
  $scope.plan = $scope.user.plan;


  // Return name of current state.
  $scope.currentState = function() {
    return $state.current.name;
  };

  // Returns the full path of the input within ./dashboard/.
  $scope.getPath = function(localPath) {
    return 'app/dashboard/' + localPath;
  };

  // Returns the full path of the target planel.
  $scope.getPlanelPath = function(target) {
    return $scope.getPath('planels/' + target + '/' + target + '.html');
  };

  // Object to keep ALL planel names and locations organized.
  $scope.planelLibrary = {
    'cash-flow-chart': $scope.getPlanelPath('cash-flow-chart'),
    'income-tax-chart': $scope.getPlanelPath('income-tax-chart'),
    'net-worth-chart': $scope.getPlanelPath('net-worth-chart'),
    'retirement-savings-growth-chart': $scope.getPlanelPath('retirement-savings-growth-chart')
  };


  /*
   *  Highcharts logic and helper functions.
  */

  // Calculates and return the total of a given group.
  $scope.sumGroup = function(group) {
    var total = 0;
    for (var key in group) {
      if (typeof group[key] === 'number') total += group[key];
      else total += group[key]['amount'];
    }
    return total;
  };

  // Builds an array of data for Highcharts from a plan group.
  $scope.buildHighchartData = function(obj) {
    var data = [];
    for (var key in obj) {
      data.push({ name:obj[key]['name'] || key, y:obj[key]['amount'] });
    }
    return data;
  };


  /*
   *  Planel/Overview logic and methods.
  */

  // Add planel to overview.
  $scope.addPlanel = function(planel) {
    if ($scope.user.overviewPlanels.indexOf(planel) === -1) {
      $scope.user.overviewPlanels.push(planel);
    }
  };

  // Remove planel from overview.
  $scope.removePlanel = function(planel) {
    var index = $scope.user.overviewPlanels.indexOf(planel);
    if (index !== -1) {
      $scope.user.overviewPlanels.splice(index, 1);
      $scope.$apply();
    }
  };


  /*
   *  Sidebar and submenu logic and methods.
  */

  // Defines initial view conditions for my-plan and settings if undefined.
  $scope.myPlanView = $scope.myPlanView || $scope.getPath('my-plan/net-worth/net-worth.html');
  $scope.settingsView = $scope.settingsView || $scope.getPath('settings/basic/basic.html');

  // Sets the current view for my-plan.
  $scope.setSubView = function(sub, submenu, section) {
    for (var i=0; i<submenu.length; i++) {
      submenu[i].active = false;
    }
    sub.active = true;
    $scope[section.setView] = sub.view;
  };

  // Update the chart menu with add/remove from overview options.
  $scope.updateChartMenu = function() {
    if (Highcharts.getOptions().exporting.buttons.contextButton.menuItems[0].text !== 'Add to Overview') {
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.shift();
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.unshift({
        text: 'Remove from Overview',
        onclick: function() { $scope.removePlanel(this.renderTo.id) }
      });
      Highcharts.getOptions().exporting.buttons.contextButton.menuItems.unshift({
        text: 'Add to Overview',
        onclick: function() { $scope.addPlanel(this.renderTo.id) }
      });
    }
  };
  $scope.updateChartMenu();


  /*
   *  Overview defaults and helper functions.
  */

  // Overview default planels.
  var defaultOverviewPlanels = [
    'cash-flow-chart',
    'income-tax-chart'
  ];

  // If user hasn't customized their overview yet, set it to the default planels.
  $scope.user.overviewPlanels = $scope.user.overviewPlanels || defaultOverviewPlanels.slice();

  // Reset overview planels to defaults.
  $scope.resetDefaultOverviewPlanels = function() {
    $scope.user.overviewPlanels = defaultOverviewPlanels.slice();
  };

  // Allow user to drag and drop the planels to customize the overview.
  $scope.oranizable = false;

  // TODO: Toggle ability to reorganize overview planels.
  $scope.toggleOrganizability = function() {
    //
  };

});
