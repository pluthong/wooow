'use strict';

/* App Module */

var iexchangeApp = angular.module('iexchangeApp', [
    'ngRoute',
    'iexchangeAnimations',
    'iexchangeControllers',
    'iexchangeDirectives',
    'iexchangeFilters',
    'iexchangeServices'
]);


//iexchangeApp.config(['$routeProvider', '$locationProvider',
//  function ($routeProvider, $locationProvider) {
//      $routeProvider.
//        when('/', {
//            templateUrl: '/partials/product-list.html',
//            controller: 'ProductListCtrl'
//        }).
//        when('/products/:productId', {
//            templateUrl: '/partials/product-detail.html',
//            controller: 'ProductDetailCtrl'
//        });
//  }]);