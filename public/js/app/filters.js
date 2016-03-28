'use strict';

/* Filters */

angular.module('wooowFilters', []).filter('checkproduct', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});
