'use strict';

/* Controllers */

var wooowCtrl = angular.module('wooowControllers', []);

/* Product Controller */

wooowCtrl.controller('CustomerProductCtrl', ['$scope', '$timeout', 'ProductDataService',

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
        $scope.selectpageSize = $scope.pageSizes[2];

        // variable
        $scope.numTotalOfPage = 0;
        $scope.currentPage = 0;
        $scope.totalItems = 0;
        $scope.message = "";


        // get customer's product
        $scope.getCustomerProducts = function (func) {

            var data = { search: $scope.search, page: ($scope.currentPage + 1), itemsByPage: $scope.selectpageSize.pageSize };

            ProductDataService.getAllProductImageMain(data)
            .then(function (res) {

                $scope.products = res.data;
                $scope.totalItems = res.NumItems;
                $scope.selectpageSize = $scope.pageSizes[$scope.pageSizes.indexOf($scope.selectpageSize)];
                $scope.groupToPages();
                $scope.prev = ($scope.currentPage * $scope.selectpageSize.pageSize) + 1;
                $scope.succ = $scope.currentPage == ($scope.numTotalOfPage - 1) ? $scope.totalItems : (($scope.currentPage + 1) * $scope.selectpageSize.pageSize);

                $timeout(function () {
                    $scope.$broadcast('DATAREADY');
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

        $scope.deleteProduct = function (id) {
            $('#confirm-delete-product').data('id', id).modal('show');
        };

        $('.confirm-deletion').click(function () {

            var id = $('#confirm-delete-product').data('id');

            ProductDataService.deleteProduct(id)
                .then(function (res) {
                    console.log(res.data.message);
                    $scope.error = res.error;
                    $scope.message = res.data.message;
                    $scope.currentPage = 0;
                    $scope.getCustomerProducts();
                })
                .catch(function (err) {
                    $scope.error = err.error;
                    $scope.message = err.data.message;
                });

            $('#confirm-delete-product').modal('hide');
        });

    }]);

//iexchangeControllers.controller('ProductListCtrl', ['$scope', 'Product',
//  function ($scope, Product) {
//      $scope.products = Product.query();
//      $scope.orderProp = 'age';
//  }]);

wooowCtrl.controller('ProductDetailCtrl', ['$scope', '$routeParams', 'Product',
  function ($scope, $routeParams, Product) {
      $scope.product = Product.get({ productId: $routeParams.productId }, function (product) {
      });
  }]);


wooowCtrl.controller('ProductListCtrl', ['$scope', '$anchorScroll', '$timeout', 'ProductDataService',

    function ($scope, $anchorScroll, $timeout, ProductDataService) {

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
        $scope.selectpageSize = $scope.pageSizes[3];

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

        $scope.showCloseUp = function (pid) {
            $(".pspo-popout").hide();
            $(".psli").show();
            $(".psli[tps-pid='" + pid + "']").hide();
            $(".pspo-popout[tps-pid='" + pid + "']").show();
        };

        $scope.hideCloseUp = function (pid) {
            $(".pspo-popout[tps-pid='" + pid + "']").hide();
            $(".psli[tps-pid='" + pid + "']").show();
        };
    }]);


wooowCtrl.controller('ProductGalleryCtrl', ['$scope', '$anchorScroll', 'ProductDataService',


    function ($scope, $anchorScroll, ProductDataService) {

        // data initialisation
        $scope.init = function (pid) {
            console.log(pid);
            $scope.photo = null;
            $scope.productId = pid;
            $scope.loading = true;
            $scope.gallery(function () {
                $scope.loading = false;
            });
        };

        // get product's gallery
        $scope.gallery = function (func) {
            ProductDataService.getProductGallery($scope.productId)
                .then(function (res) {

                    $scope.photo = res.data;
                    $scope.photo.currentImage = $scope.photo[findWithAttr($scope.photo, 'productImageMain', 1)];

                    // run action
                    if (func) func();
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        function findWithAttr(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
        }

        // focus image ...
        $scope.focusImage = function (image,none) {
            $scope.photo.currentImage = image;
            if(!none)
                $anchorScroll();
        };

        // principal image ...

        $scope.setmain = function (img) {

            var data = { productId: img.productImageProductId, imageId: img.productImageId };

            ProductDataService.mainImage(data)
                .then(function (res) {
                    $scope.error = res.error;
                    $scope.message = res.data.message;
                    $scope.gallery();
                })
                .catch(function (err) {
                    $scope.error = err.error;
                    $scope.message = err.data.message;
                });
        };

        // delete Image
        $scope.deleteImage = function (img) {
            $('#confirm-delete-image').data('img', img).modal('show');
        };

        $('.confirm-deletion').click(function () {

            var product_id = $('#confirm-delete-image').data('img').productImageProductId;
            var image_id = $('#confirm-delete-image').data('img').productImageId;
            var data = { productId: product_id, imageId: image_id };

            ProductDataService.deleteImage(data)
                .then(function (res) {
                    $scope.error = res.error;
                    $scope.message = res.data.message;
                    $scope.gallery();
                })
                .catch(function (err) {
                    $scope.error = err.error;
                    $scope.message = err.data.message;
                });

            $('#confirm-delete-image').modal('hide');
        });

    }]);
