'use strict';

/* Services */

var wooowSrv = angular.module('wooowServices', ['ngResource']);

// $resource(url, [paramDefaults], [actions], options);

wooowSrv.factory('Product', ['$resource',
  function ($resource) {
      return $resource('products/:productId', {}, {
          query: { method: 'GET', params: { productId: 'list' }, isArray: true }
      });
  }]);

wooowSrv.factory('ProductDataService', ['$http', '$q', function ($http, $q) {
    return {

        getAllProduct: function (data) {
            var deferred = $q.defer();
            $http({
                url: '/product/allMainImageOnly',
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

        getAllProductImageMain: function (data) {
            var deferred = $q.defer();
            $http({
                url: '/product/oauth/allMainImageOnly',
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
        },

        deleteImage: function (data) {
            var deferred = $q.defer();
            $http({
                url: '/deleteImage',
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

        mainImage: function (data) {
            var deferred = $q.defer();
            $http({
                url: '/setImageMain',
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

        getProductGallery: function (id) {
            var deferred = $q.defer();
            $http({
                url: '/api-product-gallery/' + id,
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