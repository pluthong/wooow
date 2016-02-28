'use strict';

/* Controllers */

var iexchangeControllers = angular.module('iexchangeControllers', []);


/* Product Controller */

iexchangeControllers.controller('CustomerProductCtrl', ['$scope', '$timeout', 'ProductDataService',

    function ($scope, $timeout, ProductDataService) {

    // data initialisation
    $scope.init = function (wd) {
        $scope.search = wd;
        $scope.products = null;
        $scope.loading = true;
        $scope.getCustomerProducts(function () { $scope.loading = false; });
    };

    $scope.pageSizes = [
    { pageSize: '2' },
    { pageSize: '4' },
    { pageSize: '6' },
    { pageSize: '10' },
    { pageSize: '20' }];

    // default items selected by page
    $scope.selectpageSize = $scope.pageSizes[0];

    // variable
    $scope.numTotalOfPage = 0;
    $scope.currentPage = 0;
    $scope.totalItems = 0;

    // get customer's product
    $scope.getCustomerProducts = function (func) {

        var data = { search: $scope.search, page: ($scope.currentPage + 1), itemsByPage: $scope.selectpageSize.pageSize };

        ProductDataService.getCustomerProduct(data)
        .then(function (res) {

            $scope.products = res.data;
            $scope.totalItems = res.NumItems;
            $scope.selectpageSize = $scope.pageSizes[$scope.pageSizes.indexOf($scope.selectpageSize)];
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
        })
        .catch(function (err) {
            console.log(err);
        });

    };

    // calculate num page 
    $scope.groupToPages = function () {
        $scope.numTotalOfPage = Math.ceil($scope.totalItems / $scope.selectpageSize.pageSize);
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
            $scope.getCustomerProducts();
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.numTotalOfPage - 1) {
            $scope.currentPage++;
            $scope.getCustomerProducts();
        }
    };

    $scope.selectedItemChanged = function (item) {
        $scope.currentPage = 0;
        $scope.selectpageSize = item;
        $scope.getCustomerProducts();
    };
}]);


//iexchangeControllers.controller('ProductListCtrl', ['$scope', 'Product',
//  function ($scope, Product) {
//      $scope.products = Product.query();
//      $scope.orderProp = 'age';
//  }]);


iexchangeControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', 'Product',
  function ($scope, $routeParams, Product) {
      $scope.product = Product.get({ productId: $routeParams.productId }, function (product) {
      });
  }]);


iexchangeControllers.controller('ProductListCtrl', ['$scope', '$timeout', 'ProductDataService',

    function ($scope, $timeout, ProductDataService) {

        // data initialisation
        $scope.init = function (wd) {
            $scope.search = wd;
            $scope.products = null;
            $scope.loading = true;
            $scope.getProducts(function () {
                $scope.loading = false;
            });
        };

        $scope.pageSizes = [
        { pageSize: '2' },
        { pageSize: '4' },
        { pageSize: '6' },
        { pageSize: '10' },
        { pageSize: '20' }];

        // default items selected by page
        $scope.selectpageSize = $scope.pageSizes[0];

        // variable
        $scope.numTotalOfPage = 0;
        $scope.currentPage = 0;
        $scope.totalItems = 0;

        // get products
        $scope.getProducts = function (func) {

            var data = { search: $scope.search, page: ($scope.currentPage + 1), itemsByPage: $scope.selectpageSize.pageSize };

            ProductDataService.getAllProduct(data)
            .then(function (res) {

                $scope.products = res.data;
                $scope.totalItems = res.NumItems;
                $scope.selectpageSize = $scope.pageSizes[$scope.pageSizes.indexOf($scope.selectpageSize)];
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
            })
            .catch(function (err) {
                console.log(err);
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

        $scope.selectedItemChanged = function (item) {
            $scope.currentPage = 0;
            $scope.selectpageSize = item;
            $scope.getProducts();
        };

        $scope.showCloseUp = function (id) {
            $(".pspo-popout").hide();
            $(".psli").show();
            $(".psli[data-docid='" + id + "']").hide();
            $(".pspo-popout[data-docid='" + id + "']").show();
        };

        $scope.hideCloseUp = function (id) {
            $(".pspo-popout[data-docid='" + id + "']").hide();
            $(".psli[data-docid='" + id + "']").show();
        };
    }]);
