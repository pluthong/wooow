'use strict';

/* Controllers */

var iexchangeControllers = angular.module('iexchangeControllers', []);



/* Product Controller */

iexchangeControllers.controller('CustomerProductCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

    // data initialisation
    $scope.init = function (wd) {
        $scope.search = wd;
        $scope.products = null;
        $scope.loading = true;
        $scope.getProducts(function () { $scope.loading = false; });
    };

    $scope.pageSizes = [
    { pageSize: '10' },
    { pageSize: '20' },
    { pageSize: '50' },
    { pageSize: '100' }];

    // default items selected by page
    $scope.selectpageSize = $scope.pageSizes[0];

    // variable
    $scope.numTotalOfPage = 0;
    $scope.currentPage = 0;
    $scope.totalItems = 0;
    $scope.pageDimension = 0;
    $scope.ind = 0;

    // get products
    $scope.getProducts = function (func) {

        var data = { search: $scope.search, page: ($scope.currentPage + 1), itemsByPage: $scope.selectpageSize.pageSize };

        $http({ method: 'POST', url: '/search-lead/list', data: data }).success(function (res) {
            $scope.products = res.data;
            $scope.totalItems = res.NumItems;
            $scope.currentPage = res.CurrentP - 1;
            $scope.pageDimension = res.ItemsByPage;

            $scope.searchIndex();
            $scope.selectpageSize = $scope.pageSizes[$scope.ind];
            $scope.groupToPages();
            $scope.prev = ($scope.currentPage * $scope.selectpageSize.pageSize) + 1;
            $scope.succ = $scope.currentPage == ($scope.numTotalOfPage - 1) ? $scope.totalItems : (($scope.currentPage + 1) * $scope.selectpageSize.pageSize);

            $timeout(function () {
                $scope.$apply(function () {
                    $scope.$broadcast('DATAREADY');
                });
            }, 1000);

            // run action
            if (func) func();
        });
    };

    // calculate num page 
    $scope.groupToPages = function () {
        $scope.numTotalOfPage = Math.ceil($scope.totalItems / $scope.selectpageSize.pageSize);
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
            $scope.getProducts();
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.numTotalOfPage - 1) {
            $scope.currentPage++;
            $scope.getProducts();
        }
    };

    $scope.searchIndex = function () {
        for (var i = 0; i < $scope.pageSizes.length; i++) {
            if ($scope.pageSizes[i].pageSize == $scope.pageDimension) {
                $scope.ind = i;
                break;
            }
        }
    };

    $scope.formatPhone = function (phone) {
        return phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10);
    };

    $scope.setMainImage = function (image) {
        $scope.pageDimension = image.pageSize;
        $scope.searchIndex();
        $scope.selectpageSize = $scope.pageSizes[$scope.ind];
        $scope.getProducts();
    };

}]);



/* HighLight Controller */

iexchangeControllers.controller('HighlightCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.getClass = function (action) {

        var protocol = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var url = "";


        if (port > 0) {
            url = protocol + "://" + host + ":" + port;
        }
        else {
            url = protocol + "://" + host;
        }


        var absurl = $location.absUrl();
        var substr = absurl.substr(url.length, action.length);

        if (substr === action) {
            if (substr == '/' && url.length + 2 < absurl.length)
                return ''
            return 'active';
        } else {
            return '';
        }

    }
}]);


iexchangeControllers.controller('ProductListCtrl', ['$scope', 'Product',
  function ($scope, Product) {
      $scope.products = Product.query();
      $scope.orderProp = 'age';
  }]);


iexchangeControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', 'Product',
  function ($scope, $routeParams, Product) {
      $scope.product = Product.get({ productId: $routeParams.productId }, function (product) {
      });
  }]);
