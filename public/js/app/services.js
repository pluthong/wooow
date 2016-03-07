'use strict';

/* Services */

var iexchangeServices = angular.module('iexchangeServices', ['ngResource']);

// $resource(url, [paramDefaults], [actions], options);

iexchangeServices.factory('Product', ['$resource',
  function ($resource) {
      return $resource('products/:productId', {}, {
          query: { method: 'GET', params: { productId: 'list' }, isArray: true }
      });
  }]);

iexchangeServices.factory('ProductDataService', ['$http', '$q', function ($http, $q) {

    return {

        getAllProduct: function (data) {

            var deferred = $q.defer();

            $http({
                url: '/products/list',
                method: 'GET',
                withCredentials: false,
                params: data
            }).success(function (res) {
                deferred.resolve(res);
            }).error(function (ajaxResponse, status, headers, config) {
                deferred.reject(ajaxResponse);
            });

            return deferred.promise;
        },

        getCustomerProduct: function (data) {

            var deferred = $q.defer();

            $http({
                url: '/products/customerlist',
                method: 'GET',
                withCredentials: false,
                params: data
            }).success(function (res) {
                deferred.resolve(res);
            }).error(function (ajaxResponse, status, headers, config) {
                deferred.reject(ajaxResponse);
            });

            return deferred.promise;
        },

        deleteProduct: function (id) {

            var deferred = $q.defer();

            $http({
                url: '/deleteProduct/' + id,
                method: 'GET',
                withCredentials: false,
            }).success(function (res) {
                deferred.resolve(res);
            }).error(function (ajaxResponse, status, headers, config) {
                deferred.reject(ajaxResponse);
            });

            return deferred.promise;
        }

    };

}]);