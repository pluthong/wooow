'use strict';

/* Custom directive tpsPagination */

var iexchangeDirectives = angular.module("iexchangeDirectives", []);

iexchangeDirectives.directive('tpsPagination', function () {
    return {
        restrict: 'E',
        scope: {
            labelPrev: '=',
            labelSucc: '=',
            labelTotalitems: '=',
            labelCurrentpage: '=',
            labelNumtotalofpage: '=',
            pageSizeValue: '=',
            pageSizes: '=',
            funcSelectedItemChanged: '&',
            funcPrevpage: '&',
            funcNextpage: '&'
        },
        templateUrl: '/template/pagination.html',
        link: function (scope, element, attrs) {

            scope.$on("DATAREADY", function () {

                scope.selectedItemChanged = function (item) {
                    scope.funcSelectedItemChanged({ ItemChanged: item });
                };

                scope.onPrevPage = function () {
                    scope.funcPrevpage();
                };

                scope.onNextPage = function () {
                    scope.funcNextpage();
                };
            });
        }
    };
});