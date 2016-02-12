

/* Custom directive tpsPagination */
var imagemod = angular.module("pagDir", []);

imagemod.directive('tpsPagination', function () {
    return {
        restrict: 'E',
        scope: {
            labelPrev: '=',
            labelSucc: '=',
            labelTotalitems: '=',
            labelCurrentpage: '=',
            labelNumtotalofpage: '=',
            local: '=',
            pageSizes: '=',
            onSetMain: '&',
            funcPrevpage: '&',
            funcNextpage: '&'
        },
        templateUrl: '/Template/pagination.html',
        link: function (scope, element, attrs) {

            scope.$on("DATAREADY", function () {


                scope.setmain = function (img) {
                    scope.onSetMain({image:img});
                };

                scope.onPrevPage = function () {
                    scope.funcPrevpage();
                };

                scope.onNextPage = function () {
                    scope.funcNextpage();
                };
                
                scope.switchColor = function () {

                    $('.circle').each(function (index, value) {

                        var ind = index % 10;

                        switch (ind) {
                            case 0:
                                $(this).addClass("blueth");
                                break;
                            case 1:
                                $(this).addClass("redth");
                                break;
                            case 2:
                                $(this).addClass("greenth");
                                break;
                            case 3:
                                $(this).addClass("orangeth");
                                break;
                            case 4:
                                $(this).addClass("aquamarineth");
                                break;
                            case 5:
                                $(this).addClass("maroonth");
                                break;
                            case 6:
                                $(this).addClass("crimsonth");
                                break;
                            case 7:
                                $(this).addClass("deeppinkth");
                                break;
                            case 8:
                                $(this).addClass("blackth");
                                break;
                            case 9:
                                $(this).addClass("mediumpurpleth");
                                break;
                        }
               
                    });
                };

                scope.switchColor();
             

            });
        }
    };
});