'use strict';

angular.module('prosperenceApp')
.factory('CalcsService', function($http) {
  return {
    getRetirementProjection: function(plan) {
      return $http.get('/calcs/retire', { plan: plan });
    },

    getTaxProjection: function(plan) {
      return $http.get('/calcs/tax', { plan: plan });
    },

    getMarketHistory: function(plan) {
      return $http.get('/api/market-history');
    }
  };
});
