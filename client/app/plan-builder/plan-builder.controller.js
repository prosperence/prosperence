'use strict';

angular.module('prosperenceApp')
.controller('PlanBuilderCtrl', function($rootScope, $scope, $location, $state, Auth) {
  $scope.isCollapsed = true;
  $scope.user = Auth.getCurrentUser() || {};
  $scope.user.personal = $scope.user.personal || {};
  $scope.user.plan = $scope.user.plan || {};
  var currentSectionIndex = currentSectionIndex || 0;
  var queries;

  // List of states for location questions.
  $scope.states = [ 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI',
        'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS',
        'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI',
        'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY' ];

  $scope.sections = [
    { text: 'Introduction', enabled: true, state: 'plan-builder.start' },
    { text: 'Personal Info', enabled: true, state: 'plan-builder.basics' },
    { text: 'Assets', enabled: true, state: 'plan-builder.assets' },
    { text: 'Debts', enabled: true, state: 'plan-builder.debts' },
    { text: 'Spending', enabled: true, state: 'plan-builder.spending' },
    { text: 'Savings', enabled: true, state: 'plan-builder.savings' },
    { text: 'Insurances', enabled: true, state: 'plan-builder.insurances' },
    { text: 'Taxes', enabled: true, state: 'plan-builder.tax' },
    { text: 'Goals', enabled: true, state: 'plan-builder.goals' }
  ];

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

  // Returns true if current section is valid, else false.
  $scope.isValid = function() {
    return $('.ng-invalid:visible').length === 0;
  };

  // var queries;
  // Move to previous accordion group or section.
  $scope.gotoprevious = function() {
    // queries = $scope.$$childHead.queries;
    if (!queries || !!queries[0].isOpen) {
      $state.go($scope.sections[currentSectionIndex-1].state);
    } else {
      // Else move to next accordion section.
      var i = queries.length-1;
      while (!queries[i].isOpen) {
        i--;
        // Edge case: if all sections are closed.
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
    // queries = $scope.$$childHead.queries;
    // var accordions = $('.panel');
    // console.log(queries)
    if (!queries || queries[queries.length-1].isOpen) {
      $state.go($scope.sections[currentSectionIndex+1].state);
    } else {
      // Else move to next accordion section.
      var i = 0;
      while (!queries[i].isOpen) {
        i++;
        // Edge case: if all sections are closed.
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

  // Provides $scope access to substate queries objects.
  $scope.setQueries = function(newQueries) {
    queries = newQueries;
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

  // TODO: Save all changes on form inputs.
  // For now, this is being used for testing purposes.
  $scope.save = function(route) {
    console.log('inside $scope.save()');
    console.log(queries);
  };

});
