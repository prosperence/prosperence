'use strict';

angular.module('prosperenceApp')
.factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q, $state, User) {
  var currentUser = {};
  if($cookieStore.get('token')) {
    currentUser = User.get();
  }

  return {

    /**
     * Authenticate user and save token
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    login: function(user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      })
      .success(function(data) {
        $cookieStore.put('token', data.token);
        $http.get('/api/users/me')
        .success(function(user) {
          currentUser = user;
          if ($state.current.name === 'main') {
            $state.go('dashboard.overview');
          } else {
            $state.go($state.current, {}, { reload: true }); //second parameter is for $stateParams.
          }
        });
        deferred.resolve(data);
        return cb();
      })
      .error(function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    },

    // Delete access token and user info. Param is {Function}.
    logout: function() {
      $cookieStore.remove('token');
      currentUser = {};
    },

    /**
     * Create a new user
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    createUser: function(user, callback) {
      var cb = callback || angular.noop;

      return User.save(user,
        function(data) {
          $cookieStore.put('token', data.token);
          $http.get('/api/users/me')
          .success(function(user) {
            currentUser = user;
          });
          return cb(user);
        },
        function(err) {
          this.logout();
          return cb(err);
        }.bind(this)).$promise;
    },

    /**
     * Change password
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional
     * @return {Promise}
     */
    changePassword: function(oldPassword, newPassword, callback) {
      var cb = callback || angular.noop;
      return User.changePassword({ id: currentUser._id }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(user) {
        return cb(user);
      }, function(err) {
        return cb(err);
      }).$promise;
    },

    // Update the current user plan object.
    updatePlan: function(newPlan, callback) {
      var cb = callback || angular.noop;
      return User.updatePlan({ id: currentUser._id }, {
        newPlan: newPlan
      }, function(user) {
        return cb(user);
      }, function(err) {
        return cb(err);
      }).$promise;
    },

    // Get all available info on authenticated user. Returns {Object} user.
    getCurrentUser: function() {
      return currentUser;
    },

    // Check if a user is logged in. Returns {Boolean}.
    isLoggedIn: function() {
      return currentUser.hasOwnProperty('role');
    },

    // Waits for currentUser to resolve before checking if user is logged in.
    isLoggedInAsync: function(cb) {
      if(currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise.then(function() {
          cb(true);
        }).catch(function() {
          cb(false);
        });
      } else if(currentUser.hasOwnProperty('role')) {
        cb(true);
      } else {
        cb(false);
      }
    },

    // Check if a user is an advisor. Returns {Boolean}.
    isAdvisor: function() {
      return currentUser.isAdvisor === true;
    },

    // Check if a user is an admin. Returns {Boolean}.
    isAdmin: function() {
      return currentUser.role === 'admin';
    },

    // Get auth token.
    getToken: function() {
      return $cookieStore.get('token');
    },

    // TODO: Update user
    updateUser: function() {
      //
    }
  };
});
