'use strict';

/* Filters */

angular.module('iexchangeFilters', []).filter('checkproduct', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});
