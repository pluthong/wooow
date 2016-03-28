'use strict';

/* Custom directive tpsPagination */

var wooowDir = angular.module("wooowDirectives", []);

wooowDir.directive('tpsPagination', function () {
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
        templateUrl: '/Template/pagination.html',
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