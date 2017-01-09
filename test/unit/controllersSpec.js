'use strict';

/* jasmine specs for controllers go here */
describe('Wooow controllers', function () {

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });
    
    beforeEach(module(''));

    beforeEach(module('wooowControllers'));

    beforeEach(module('wooowServices'));

    describe('CustomerProductCtrl', function () {

        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            //$httpBackend.expectGET('phones/phones.json').
            //    respond([{ name: 'Nexus S' }, { name: 'Motorola DROID' }]);

            scope = $rootScope.$new();
            ctrl = $controller('CustomerProductCtrl', { $scope: scope,  });
        }));

        it('expect size pageSize to be 5', function () {
            expect(scope.pageSizes.length).toBe(5);
        });

    });

});


