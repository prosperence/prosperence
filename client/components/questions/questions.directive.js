// ****************************************************************************
// Pease read the Question-Directive-README.md before editing this file.
// ****************************************************************************
'use strict';

angular.module('prosperenceApp')

// For displaying a collection of questions within one of the plan-builder sub-states.
// Accepts an array of queries objects as a parameter (see question directive for info on query objects.)
.directive('questions', function() {
  return {
    restrict: 'E',
    scope: {
      queries: '=',
      plangroup: '=',
      gotonext: '&'
    },
    controller: function($scope) {
      // By default, the first question in the series is opened
      $scope.queries[0].isOpen = true;
      $scope.queries[0].isEnabled = true;

      // Enables the next accordion section.
      function enableNextQuestion(index) {
        if (typeof index === 'number' && $scope.queries[index+1]) {
          $scope.queries[index + 1].isEnabled = true;
        }
      };

      // Disables the next accordion section.
      function disableNextQuestions(index) {
        if (typeof index === 'number') {
          while ($scope.queries[index+1]) {
            $scope.queries[index + 1].isEnabled = false;
            index++;
          }
        }
      };

      // Returns the index of the currently open section.
      function currentlyOpen() {
        for (var i=0; i<$scope.queries.length; i++) {
          if ($scope.queries[i].isOpen) {
            return i;
          }
        }
        return null;
      };

      // Check for validity of inputs on current section.
      $scope.checkValid = function() {
        var index = currentlyOpen();
        if (index !== null) {
          if ($('.ng-invalid:visible').length === 0) {
            $scope.queries[index].isComplete = true;
            enableNextQuestion(index);
            return true;
          }
          $scope.queries[index].isComplete = false;
          disableNextQuestions(index);
          return false;
        }
        return null;
      };

      // Open specific question section.
      $scope.openSection = function(target) {
        var current = currentlyOpen();
        if (target !== current) {
          // If target section is before current section, open target section.
          if (target < current) {
            $scope.queries[target].isOpen = true;
          }
          // If target section is after current section, check for validity before moving.
          else if ($scope.queries[target].isEnabled) {
            $scope.queries[target].isOpen = true;
          } else {
            $scope.gotonext();
          }
        }
      };

      // Trigger events on keypress.
      $('questions').keypress(function() {
        $scope.checkValid();
        // Advance the focus of the user to the next fillable field when 'enter' is pressed.
        if (event.keyCode === 13) {
          var textboxes = $('input:visible');
          var currentIndex;
          if ($('input:focus').length > 0) {
            currentIndex = textboxes.index($('input:focus'));
          }
          // If there is another input field, move focus to that field.
          if (textboxes[currentIndex + 1] !== undefined) {
            var nextBox = textboxes[currentIndex + 1];
            nextBox.focus();
            return nextBox.select();
          }
          // If focus is on final input, invoke gotonext() to check validity and move to the next question or section.
          else {
            $scope.gotonext();
          }
          event.preventDefault();
        }
      });

      // TODO: Previously enabled sections should remain enables if the user goes back.

    },
    templateUrl: 'components/questions/questionsTemplate.html'
  };
})

// Invoked from within the questions directive template.
// Accepts a single question object as a parameter.
.directive('question', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      query: '=',
      plangroup: '='
    },
    controller: function($scope) {
      if ($scope.query.isComplete) $scope.query.isEnabled = true;

      // If query is binding to a nested object, recursively track through plan to assign binding.
      var setBinding = function(path) {
        if ($scope.plangroup[path[0]] === undefined) {
          if ($scope.query.type === 'table') $scope.plangroup[path[0]] = [];
          else $scope.plangroup[path[0]] = {};
        }
        $scope.plangroup = $scope.plangroup[path.shift()];
        if (path.length > 1) setBinding(path);
        else $scope.query.bind = path.shift();
      };

      if (!!$scope.query.bind && $scope.query.bind.split('.').length > 1) {
        // If plangroup is undefined, then initialize it as an empty object.
        if ($scope.plangroup === undefined) $scope.plangroup = {};
        // Set binding to nested property.
        setBinding($scope.query.bind.split('.'));
      }

      // Handle special conditions for multi type questions.
      if ($scope.query.type === 'multi') {
        // If a binding is defined for a multi question object, reset binding to the subgroup.
        if ($scope.query.bind) {
          $scope.plangroup = $scope.plangroup[$scope.query.bind];
        }
        // Look for date type and fix objects cast as strings.
        for (var key in $scope.query.subqueries) {
          // Correct date formats.
          if ($scope.query.subqueries[key].type === 'date' && typeof $scope.plangroup[$scope.query.subqueries[key].bind] === 'string') {
            var temp = $scope.plangroup[$scope.query.subqueries[key].bind].split('-');
            // Create new date obj from above string.
            var newdate = new Date(temp[0], temp[1], temp[2].slice(0,2));
            $scope.plangroup[$scope.query.subqueries[key].bind] = newdate;
          }
        }
      }

      // Check and fix data formatting for non multi-nested date objects.
      if ($scope.query.type === 'date' && typeof $scope.plangroup[$scope.query.bind] === 'string') {
        var temp = $scope.plangroup[$scope.query.bind].split('-');
        // Create new date obj from above string.
        var newdate = new Date(temp[0], temp[1], temp[2].slice(0,2));
        $scope.plangroup[$scope.query.bind] = newdate;
      }

      // Creates a new row for the input table.
      var makeRow = function() {
        var row = {};
        for(var i = 0; i < $scope.query.fields.length; i++) {
          row[$scope.query.fields[i].label] = '';
        }
        return row;
      };

      $scope.addRow = function(property) {
        $scope.plangroup[property] = $scope.plangroup[property] || [];
        $scope.plangroup[property].push(makeRow());
      };
      $scope.deleteRow = function(index, property) {
        $scope.plangroup[property].splice(index, 1);
      };
      $scope.isEnabled = function(title) {
        return $scope.sections.enabled[title];
      };
      $scope.isComplete = function(title) {
        return $scope.sections.complete[title];
      };

      // If property is empty and input type is a table, start with an empty row.
      if ($scope.query.type === 'table') {
        $scope.plangroup[$scope.query.bind] = $scope.plangroup[$scope.query.bind] || [makeRow()];
      }
    },
    templateUrl: 'components/questions/questionTemplate.html'
  };
});
