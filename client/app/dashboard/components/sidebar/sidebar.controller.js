'use strict';

angular.module('prosperenceApp')
.controller('DashboardSidebarCtrl', function ($scope, $state) {

  // Sidebar information.
  $scope.sidebar = [{
    title: 'Overview',
    link: 'dashboard.overview',
    icon: '',
    dropdown: [
      { text: 'Organize Items', func: '' }, // Allow user to drag & drop overview planels to customize order.
      { text: 'Reset to Default', func: $scope.resetDefaultOverviewPlanels } // Reset overview planels to defaults.
    ]
  }, {
    title: 'My Plan',
    link: 'dashboard.my-plan',
    icon: '',
    setView: 'myPlanView',
    submenu: [{
      title: 'Net Worth',
      view: $scope.getPath('my-plan/net-worth/net-worth.html'),
      active: true
    }, {
      title: 'Budget',
      view: $scope.getPath('my-plan/budget/budget.html')
    }, {
    //   title: 'Insurance',
    //   view: $scope.getPath('my-plan/insurance/insurance.html')
    // }, {
      title: 'Retirement',
      view: $scope.getPath('my-plan/retire/retire.html')
    }, {
      title: 'Add More',
      view: $scope.getPath('my-plan/more/more.html')
    }]
  }, {
    title: 'Progress',
    link: 'dashboard.progress',
    icon: ''
  }, {
    title: 'My University',
    link: 'dashboard.university',
    icon: ''
  }, {
    title: 'Settings',
    link: 'dashboard.settings',
    icon: 'glyphicon glyphicon-cog',
    setView: 'settingsView',
    submenu: [{
      title: 'Basic',
      view: $scope.getPath('settings/basic/basic.html'),
      active: true
    }, {
      title: 'Notifications',
      view: $scope.getPath('settings/notifications/notifications.html')
    }, {
      title: 'Security',
      view: $scope.getPath('settings/security/security.html')
    }]
  }];

  // Check and set submenu viewability on load/state enter.
  for (var i=0; i<$scope.sidebar.length; i++) {
    if ($state.current.name === $scope.sidebar[i].link && $scope.sidebar[i].submenu) {
      $scope.sidebar[i].submenu.visible = true;
    }
  }

  // Sets visibility of submenus in the sidebar.
  $scope.showSubmenu = function(selected) {
    // Reset all submenus to not visible.
    for (var i=0; i<$scope.sidebar.length; i++) {
      if ($scope.sidebar[i].submenu) {
        $scope.sidebar[i].submenu.visible = false;
      }
    }
    // Set selected sidebar submenu to visible.
    if (!!selected && selected.submenu) {
      selected.submenu.visible = true;
    }
  };

  // Dropdown menu toggle
  $('.dropdown').click(function() {
    $('.dropdown-toggle').dropdown('toggle');
  });

});
