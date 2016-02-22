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
