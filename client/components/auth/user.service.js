'use strict';

angular.module('prosperenceApp')
.factory('User', function ($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    updatePlan: {
      method: 'PUT',
      params: {
        controller:'plan'
      }
    }
  });
});
