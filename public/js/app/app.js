'use strict';

/* App Module */

var wooowApp = angular.module('wooowApp', [
    'ngRoute',
    'wooowAnimations',
    'wooowControllers',
    'wooowDirectives',
    'wooowFilters',
    'wooowServices'
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