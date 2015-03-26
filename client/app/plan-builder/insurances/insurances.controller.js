'use strict';

angular.module('prosperenceApp')
.controller('InsurancesCtrl', function ($scope) {
  $scope.user.plan.insurances = $scope.user.plan.insurances || {};

  // Define the user or plan object that $scope.queries questions should bind to.
  $scope.plangroup = $scope.user.plan;

  $scope.queries = [{
    title: 'Health Insurance',
    question: 'Health insurance is important and legally required.  The most important thing is that you have it.',
    type: 'multi',
    bind: 'insurances',
    subqueries: [{
      question: 'Do you have health insurance?',
      type: 'select',
      options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
      bind: 'userHealth'
    }, {
      question: 'Does your spouse\'s have health insurance?',
      type: 'select',
      options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
      bind: 'spouseHealth',
      condition: 'maritalStatus'
    }]
  }, {
    title: 'Home and Auto Insurance',
    question: 'Homeowners insurance is important and legally required (if you own a home).  The most important thing is that you have it.',
    type: 'multi',
    bind: 'insurances',
    subqueries: [{
      question: 'Do you have homeowners insurance?',
      type: 'select',
      options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
      bind: 'userHome'
    }, {
      question: 'Do you have auto insurance?',
      type: 'select',
      options: [ {text:'Yes', value:true}, {text:'No', value:false} ],
      bind: 'userAuto'
    }]
  }, {
    title: 'Life Insurance',
    question: 'Life insurance can be important.',
    type: 'multi',
    bind: 'insurances',
    subqueries: [{
      question: 'Enter the total life insurance benefit provided to you by your employer:',
      type: 'number',
      bind: 'userEmployerLife'
    }, {
      question: 'Enter the total life insurance benefit provided to your spouse\'s by your spouse\'s employer:',
      type: 'number',
      bind: 'spouseEmployerLife',
      condition: 'maritalStatus'
    }, {
      question: 'Enter the total life insurance benefit from coverage you own independently of your employer:',
      type: 'number',
      bind: 'userIndividualLife'
    }, {
      question: 'Enter the total life insurance benefit your spouse\'s owns own independently of your spouse\'s employer:',
      type: 'number',
      bind: 'spouseIndividualLife',
      condition: 'maritalStatus'
    }]
  }, {
    title: 'Disability Insurance',
    question: 'Disability insurance can be important.',
    type: 'multi',
    bind: 'insurances',
    subqueries: [{
      question: 'Enter the total disability insurance benefit provided to you by your employer:',
      type: 'number',
      bind: 'userEmployerDisability'
    }, {
      question: 'Enter the total disability insurance benefit provided to your spouse\'s by your spouse\'s employer:',
      type: 'number',
      bind: 'spouseEmployerDisability',
      condition: 'maritalStatus'
    }, {
      question: 'Enter the total disability insurance benefit from coverage you own independently of your employer:',
      type: 'number',
      bind: 'userIndividualDisability'
    }, {
      question: 'Enter the total disability insurance benefit your spouse\'s owns own independently of your spouse\'s employer:',
      type: 'number',
      bind: 'spouseIndividualDisability',
      condition: 'maritalStatus'
    }]
  }];

  $scope.checkQueriesComplete($scope.queries, $scope.plangroup);

});
