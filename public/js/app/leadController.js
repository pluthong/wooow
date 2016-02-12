
/* Lead Controller */

angular.module('leadMod', []).controller('ProductCtrl', ['$scope', '$http','$timeout', function ($scope, $http, $timeout) {

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

    // get leads
    $scope.getProducts = function (func) {

        var data = { search: $scope.search, page: ($scope.currentPage + 1), itemsByPage: $scope.selectpageSize.pageSize };
    
        $http({ method: 'POST', url: '/search-lead/list', data: data }).success(function (res) {
            console.log(res.data);
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