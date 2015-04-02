'use strict';

angular.module('prosperenceApp')
.controller('NavbarCtrl', function($scope, $state, $location, Auth, $modal) {
  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.menu = [{
    'title': 'Prosperence',
    'link': 'main',
    'style': 'font-size:18px;',
    'shown': '!isLoggedIn()'
  }, {
    'title': 'Prosperence',
    'link': 'dashboard.overview',
    'style': 'font-size:18px;',
    'shown': 'isLoggedIn()',
    'abstractLink': 'dashboard'
  }, {
    'title': 'About',
    'link': 'about',
    'shown': true
  }, {
    'title': 'Start Planning',
    'link': 'plan-builder.start',
    'shown': '!getCurrentUser().planBuilderComplete',
    'abstractLink': 'plan-builder'
  }, {
    'title': 'University',
    'icon': 'fa fa-graduation-cap',
    'link': 'university.courses',
    'shown': true,
    'abstractLink': 'university'
  }, ];

  $scope.openLoginModal = function(goToSignUp) {
    $scope.modalInstance = $modal.open({
      templateUrl: 'components/navbar/partials/loginModal.html',
      size: 'lg',
      controller: 'loginController',
      resolve: {
        goToSignUp: function() {
          return goToSignUp;
        }
      }
    });
  }

  $scope.logout = function() {
    Auth.logout();
    $location.path('/');
  };

  // Sets active class on sidebar.
  $scope.isActive = function(viewLocation) {
    return $state.includes(viewLocation);
  };
})
.controller('loginController', function($scope, $state, $modalInstance, Auth, $location, goToSignUp) {
  $scope.showSignUp = goToSignUp;
  $scope.toggleRegister = function(newPage) {
    $scope.showSignUp = !$scope.showSignUp;
  };

  // Login logic
  $scope.user = {};
  $scope.errors = {};

  $scope.login = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function() {
        $modalInstance.close();
      })
      .catch (function(err) {
        $scope.errors.other = err.message;
      });
    }
  };

  // Signup logic
  $scope.register = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.createUser({
        name: $scope.user.name,
        email: $scope.user.email,
        password: $scope.user.password
      })
      .then(function() {
        $modalInstance.close();
      })
      .catch (function(err) {
        err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the mongoose errors.
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });
    }
  };
});
