'use strict';

angular.module('prosperenceApp')
.controller('PlanBuilderCtrl', function($scope, $location, $state, Auth) {
  $scope.isCollapsed = true;
  $scope.user = Auth.getCurrentUser() || {};
  $scope.user.personal = $scope.user.personal || {};
  $scope.user.plan = $scope.user.plan || {};
  $scope.user.builderProgress = $scope.user.builderProgress || {
    // null = not enabled, false = enabled but not complete, true = complete.
    'plan-builder.start': true,
    'plan-builder.basics': false,
    'plan-builder.assets': null,
    'plan-builder.debts': null,
    'plan-builder.spending': null,
    'plan-builder.savings': null,
    'plan-builder.insurances': null,
    'plan-builder.tax': null,
    'plan-builder.goals': null
  };
  var currentSectionIndex = currentSectionIndex || 0;
  var queries;

  // List of states for location questions.
  $scope.states = [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
        'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS',
        'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
        'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ];

  // Returns true if a plan-builder state is enabled, otherwise false.
  $scope.stateEnabled = function(target) {
    return $scope.user.builderProgress[target] !== null;
  };

  // Returns true if a plan-builder state is complete, otherwise false.
  $scope.stateComplete = function(target) {
    return !!$scope.user.builderProgress[target];
  };

  // Array of plan builder sections in order.
  $scope.sections = [
    { text: 'Introduction', state: 'plan-builder.start' },
    { text: 'Personal Info', state: 'plan-builder.basics' },
    { text: 'Assets', state: 'plan-builder.assets' },
    { text: 'Debts', state: 'plan-builder.debts' },
    { text: 'Spending', state: 'plan-builder.spending' },
    { text: 'Savings', state: 'plan-builder.savings' },
    { text: 'Insurances', state: 'plan-builder.insurances' },
    { text: 'Taxes', state: 'plan-builder.tax' },
    { text: 'Goals', state: 'plan-builder.goals' }
  ];

  // Returns true if current section is valid, else false.
  $scope.isValid = function() {
    return $('.ng-invalid:visible').length === 0;
  };

  // Move to previous accordion group or section.
  $scope.gotoprevious = function() {
    if (!queries || !!queries[0].isOpen) {
      $state.go($scope.sections[currentSectionIndex-1].state);
    } else {
      // Else move to next accordion section.
      var i = queries.length-1;
      while (!queries[i].isOpen) {
        i--;
        // Edge case: If all sections are closed go to previous state.
        if (i < 0) {
          return $state.go($scope.sections[currentSectionIndex-1].state);
        }
      }
      queries[i].isOpen = false;
      queries[i-1].isOpen = true;
    }
  };

  // Move to next required input field, accordion group or section.
  $scope.gotonext = function() {
    // If there is an empty required field, set focus to that input section and display popover.
    if (!$scope.isValid()) {
      $('.ng-invalid:visible').first().focus();
      return;
    }
    // If all required query sections are filled in, move to the next plan-builder section.
    if (!queries || queries[queries.length-1].isOpen) {
      $scope.user.builderProgress[$state.current.name] = true;
      if ($scope.user.builderProgress[$scope.sections[currentSectionIndex+1].state] === null) {
        $scope.user.builderProgress[$scope.sections[currentSectionIndex+1].state] = false;
      }
      $state.go($scope.sections[currentSectionIndex+1].state);
    } else {
      // Move to next accordion section.
      var i = 0;
      while (!queries[i].isOpen) {
        i++;
        // Edge case: If all sections are closed, go to next state.
        if (i >= queries.length) {
          return $state.go($scope.sections[currentSectionIndex+1].state);
        }
      }
      queries[i].isComplete = true;
      queries[i].isOpen = false;
      queries[i+1].isEnabled = true;
      queries[i+1].isOpen = true;
    }
  };

  // Transition to target state if enable, else go to last enabled state.
  $scope.goToState = function(target) {
    var lastState;
    for (var i=0, n=$scope.sections.length; i<n; i++) {
      if ($scope.stateEnabled($scope.sections[i].state)) {
        lastState = $scope.sections[i].state;
        if ($scope.sections[i].state === target) {
          return $state.go(target);
        }
      }
    }
    $state.go(lastState);
  };

  // Update page heading, navbar, and progress bar on state change within plan-builder.
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    for (var i=0, n=$scope.sections.length; i<n; i++) {
      if ($scope.sections[i].state === toState.name) {
        $scope.heading = toState.data.title;
        $scope.currentState = toState.name;
        $scope.progress = Math.max(.05, (i / (n-1))) * 100 + '%';
        currentSectionIndex = i;
      }
    }
  });

  // TODO: Save all changes for plan-builder inputs.
  // For now, this is being used for testing purposes.
  $scope.save = function(route) {
  };

  /*
   * Helper functions for substates.
  */

  // Provides $scope access to substate queries objects.
  $scope.setQueries = function(newQueries) {
    queries = newQueries;
  };

  // Checks each query object in the current queries object for completeness. Returns boolean.
  $scope.checkQueriesComplete = function(queries, plangroup) {
    if (!!queries) {
      for (var i=0, n=queries.length; i<n; i++) {
        queries[i].isComplete = checkQueryComplete(queries[i], plangroup);
        if (queries[i].isComplete && queries[i+1]) {
          queries[i+1].isEnabled = true;
        }
      }
    }
  };

  // Checks a specific query object for completeness. Returns a boolean.
  function checkQueryComplete(query, plangroup) {
    var complete = true;
    // If multi question, check for group binding, then check subqueries.
    if (query.type === 'multi') {
      plangroup = plangroup[query.bind] || plangroup;
      var current = null;
      for (var i=0, n=query.subqueries.length; i<n; i++) {
        current = checkQuestionComplete(query.subqueries[i], plangroup);
        if (!current) complete = false;
      }
    } else {
      complete = checkQuestionComplete(query, plangroup);
    }
    return complete;
  };

  // Checks a specific question for completeness. Returns a boolean.
  function checkQuestionComplete(question, plangroup) {
    var nestedBinding = setNestedBinding(question, plangroup);
    if (nestedBinding) {
      nestedBinding.group = nestedBinding.group || {};
      return nestedBinding.group[nestedBinding.bind] !== undefined;
    } else {
      return plangroup[question.bind] !== undefined;
    }
  };

  // Handles cases of nested bindings, e.g. query.bind = 'assets.fixed'
  function setNestedBinding(question, plangroup) {
    if (question.bind === undefined || plangroup === undefined) return null;
    var split = question.bind.split('.');
    if (split.length === 1) return null;
    var newBinding = {
      group: plangroup,
      bind: null
    };
    while (split.length > 1) {
      newBinding.group = newBinding.group[split.shift()];
    }
    newBinding.bind = split.pop();
    return newBinding;
  };
});
