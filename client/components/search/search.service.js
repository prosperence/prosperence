'use strict';

angular.module('prosperenceApp')
.factory('search', ['$location', '$http', '$rootScope', 'localStorageService', 'facet', function($location, $http, $rootScope, localStorageService, facet) {
  var search = {};

  search.doSearch = function(searchTerm, pageNumber, filters, limit, callback) {
    $rootScope.$broadcast('search-in-progress');
    return $http.post('/api/search/', {
      q: searchTerm,
      facets: 'category',
      start: pageNumber,
      filters: filters,
      limit: limit
    })
      .success(function(results) {
        callback(results.data);
      })
      .error(function(err) {
        console.log(err);
      });
  };

  search.doSuggestor = function(searchTerm, callback) {
    return $http.post('/api/search/suggest/', {
      q: searchTerm
    })
      .success(function(results) {
        callback(results.data);
      })
      .error(function(err) {
        console.log(err);
      });
  };

  search.processFacets = function(results) {
    // map facet name to facet label
    for(var key in results.facets){
      if(key === "category"){
        results.facets.category.buckets.forEach(function(facetTerm){
          facetTerm.label = facet[facetTerm.value]
        });
      }
    }

    // if facets stored in local storage, use the facets unless overridden by immediate search request
    if(localStorageService.get("search.facets")) {
      var localFacets = localStorageService.get("search.facets");

      //iterate over facet objects return from cloud search
      for(var cloudSearchKey in results.facets) {
        var cloudSearchFacet = results.facets[cloudSearchKey];

        //iterate over facet objects stored in local storage
        for(var localKey in localFacets) {
          var localFacet = localFacets[localKey];

          // if local facet count can be found in filtered cloud search results, set local count to count from cloud search
          // otherwise, set local facet count to 0
          if(localKey === cloudSearchKey) {

            // iterate over all facet term values in each facet stored in localhost
            localFacet.buckets.forEach(function(localBucket) {
              //initially set all facet counts to 0
              localBucket.count = 0;

              // if facet term found in cloudsearch filtered results, then set localhost values to cloud search facet counts
              cloudSearchFacet.buckets.forEach(function(cloudSearchBucket) {
                if(cloudSearchBucket.value === localBucket.value) {
                  localBucket.count = cloudSearchBucket.count;
                }
              });
            });
          }
        }
      }

      localStorageService.remove("search.facets");
      results.facets = localFacets;
    }

    localStorageService.add("search.facets", results.facets);
    return results;
  };

  return search;
}]);
