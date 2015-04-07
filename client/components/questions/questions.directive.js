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
    // transclude: true,
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
        for (var i=0, n=$scope.queries.length; i<n; i++) {
          if ($scope.queries[i].isOpen) return i;
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

      // Check for and correctly assign nested object bindings.
      if (!!$scope.query.bind && $scope.query.bind.split('.').length > 1) {
        $scope.plangroup = $scope.plangroup || {};
        setBinding($scope.query.bind.split('.'));
      }

      // Creates a new row for the input table.
      var makeRow = function(property) {
        var row = {};
        // Add row for table nested in multi type question.
        if ($scope.query.type === 'multi') {
          for (var i=0, n=$scope.query.subqueries.length; i<n; i++) {
            if ($scope.query.subqueries[i].bind === property) {
              // console.log($scope.query.subqueries[i].fields.length)
              for (var j=0, n=$scope.query.subqueries[i].fields.length; j<n; j++) {
                row[$scope.query.subqueries[i].fields[j].label] = '';
              }
            }
          }
        } else {
          for (var i=0, n=$scope.query.fields.length; i<n; i++) {
            row[$scope.query.fields[i].label] = '';
          }
        }
        return row;
      };
      $scope.addRow = function(property) {
        $scope.plangroup[property] = $scope.plangroup[property] || [];
        $scope.plangroup[property].push(makeRow(property));
      };
      $scope.deleteRow = function(index, property) {
        $scope.plangroup[property].splice(index, 1);
      };

      // Compares the first input parameter with all other parameters passed in. Not deep compare.
      $scope.compare = function(base) {
        var args = Array.prototype.slice.apply(arguments);
        for (var i=1, n=args.length; i<n; i++) {
          if (base === args[i]) {
            return true;
          }
        }
        return false;
      };

      // Returns the value of a select option. Options can be defined in two ways:
      // Either as a value or and an object with a text and value property.
      $scope.getOptionValue = function(option) {
        return option.value === undefined ? option : option.value;
      };

      // Returns true if question is shown or false if not.
      // Item is only passed in for multi questions, otherwise, check query.
      $scope.isShown = function(item) {
        var qc = $scope.query.condition;
        var queryCondition = qc === undefined || qc === true || qc === 'true' ||
                             $scope.plangroup[qc] === true || $scope.plangroup[qc] === 'true';
        // If item or item.condition are undefined, check query condition only.
        if (!item || item.condition === undefined) {
          return !!queryCondition;
        }
        // If item is defined, then check item.
        var ic = item.condition;
        var itemCondition = ic === undefined || ic === true || ic === 'true' ||
                            $scope.plangroup[ic] === true || $scope.plangroup[ic] === 'true';
        return !!itemCondition;
      }

      // Check and fix data formatting for non multi-nested date objects.
      var fixDate = function(str) {
        var temp = str.split('-');
        return new Date(temp[0], temp[1]-1, temp[2].slice(0,2));
      };
      var checkDate = function(query) {
        if (query.type === 'date' && typeof $scope.plangroup[query.bind] === 'string') {
          $scope.plangroup[query.bind] = fixDate($scope.plangroup[query.bind]);
        }
      };
      checkDate($scope.query);

      // Initialization object to handle edge cases for specific question types.
      var init = {
        multi: function(query) {
          // If a binding is defined for a multi question object, reset binding to the subgroup.
          if (query.bind) {
            $scope.plangroup = $scope.plangroup[query.bind];
          }
          // Check for and handle edge cases for subqueries.
          for (var key in query.subqueries) {
            checkDate(query.subqueries[key]);
            if (init[query.subqueries[key].type]) init[query.subqueries[key].type](query.subqueries[key]);
          }
        },
        table: function(query) {
          // If table has no rows, initialize with an empty row.
          $scope.plangroup[query.bind] = $scope.plangroup[query.bind] || [makeRow()];

          for (var row in $scope.plangroup[query.bind]) {
            for (var i=0, n=query.fields.length; i<n; i++) {
              var current = query.fields[i];
              if (current.type === 'date' && typeof $scope.plangroup[query.bind][row][current.value] === 'string') {
                $scope.plangroup[query.bind][row][current.value] = fixDate($scope.plangroup[query.bind][row][current.value]);
              }
            }
          }
        }
      };
      if (init[$scope.query.type]) init[$scope.query.type]($scope.query);
    },
    templateUrl: 'components/questions/questionTemplate.html'
  };
});
