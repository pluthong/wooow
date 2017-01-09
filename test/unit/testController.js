describe('influences controller', function () {

    var mockScope, service, backend, q, mockDeferred;

    beforeEach(function () {
        module('ngRoute');
        module('wooowAnimations');
        module('wooowControllers');
        module('wooowDirectives');
        module('wooowFilters');
        module('wooowServices');
    });

    beforeEach(function () {
        module('wooowApp');
    });

    beforeEach(inject(function ($httpBackend) {
        backend = $httpBackend;
        // '/product/oauth/allMainImageOnly'
        backend.expect("GET", "/product/oauth/allMainImageOnly?itemsByPage=6&page=1").respond([
             {
                 "productId": 1,
                 "createDate": "2016-03-22T21:57:42.000Z",
                 "name": "Shopping Basket - Blue - 12\" x 17\" x 8\"",
                 "description": "Blue Shopping Baskets are a convenience for your customers that pays dividends in increased purchases. Baskets are break-resistant plastic with durable folding plastic handles.",
                 "category": "Basket",
                 "price": 4.95,
                 "productCustomerId": 1,
                 "images": [
                     {
                         "productImageId": 1,
                         "createDate": "2016-04-11T22:18:09.000Z",
                         "productImageMain": 1,
                         "productImageUrl": "0ea1969f14378f6b7fe507ff970de9ad.jpg",
                         "productImageProductId": 1
                     }
                 ]
             },
             {
                 "productId": 2,
                 "createDate": "2016-03-22T21:59:05.000Z",
                 "name": "Samsung Galaxy S5 - 16 GB - Charcoal Black - Sprint - CDMA/GSM",
                 "description": "Key features android: powered by google, tailored to you. The galaxy S5 runs Android, a smart and open operating system. Itâ€™s fully customizable, thanks to application ",
                 "category": "Smartphone",
                 "price": 79.99,
                 "productCustomerId": 1,
                 "images": [
                 {
                     "productImageId": 2,
                     "createDate": "2016-07-13T23:12:00.000Z",
                     "productImageMain": 1,
                     "productImageUrl": "669de1b1300cc0ad1a29e05738bf47dd.jpg",
                     "productImageProductId": 2
                 }
                 ]
             },
             {
                 "productId": 3,
                 "createDate": "2016-03-22T22:03:03.000Z",
                 "name": "2012-13 Chanel Le Boy Beige Quilted Leather Large Shopping Tote Crossbody Bag",
                 "description": "This Chanel Le Boy cross-body tote features a brass-tone logo lock closure, a chain and leather shoulder strap, and two leather handles.",
                 "category": "Bag",
                 "price": 3680,
                 "productCustomerId": 1,
                 "images": [
                 {
                     "productImageId": 7,
                     "createDate": "2016-03-22T22:03:03.000Z",
                     "productImageMain": 1,
                     "productImageUrl": "53b546cc51ca41fcf91bd8178b0ec9b1.jpg",
                     "productImageProductId": 3
                 }
                  ]
             }
        ]);
    }));

    beforeEach(inject(function ($controller, $rootScope, $q, ProductDataService) {
        q = $q;
        mockDeferred = q.defer();
        mockScope = $rootScope.$new();
        // Use a Jasmine Spy to return the deferred promise
        spyOn(ProductDataService, 'getAllProductImageMain').and.returnValue(mockDeferred.promise);
        $controller('CustomerProductCtrl', {
            $scope: mockScope,
            ProductDataService: ProductDataService
        });

    }));

    it('check var in scope.init', function () {
        mockScope.init('word');
        expect(mockScope.search).toEqual('word');
        expect(mockScope.products).toBeNull();
        expect(mockScope.loading).toBeTruthy();
    });

    it('check pageSizes array', function () {
        expect(mockScope.pageSizes.length).toEqual(5);
        expect(mockScope.pageSizes[0].pageSize).toEqual('2');
        expect(mockScope.pageSizes[1].pageSize).toEqual('4');
        expect(mockScope.pageSizes[2].pageSize).toEqual('6');
        expect(mockScope.pageSizes[3].pageSize).toEqual('10');
        expect(mockScope.pageSizes[4].pageSize).toEqual('20');
        expect(mockScope.pageSizes[5]).not.toBeDefined();
    })

    it('check default items selected by page', function () {
        expect(mockScope.selectpageSize).toBe(mockScope.pageSizes[2]);
    });

    it('check others initialized variables', function () {
        expect(mockScope.numTotalOfPage).toEqual(0);
        expect(mockScope.currentPage).toEqual(0);
        expect(mockScope.totalItems).toEqual(0);
        expect(mockScope.message).toEqual('');
    });

    it('should resolve promise', function () {

        // Setup the data we wish to return for the .then function in the controller
        mockDeferred.resolve([{ id: 1 }, { id: 2 }]);

        // We have to call apply for this to work
        mockScope.$apply();

    
        // Since we called apply, not we can perform our assertions
        expect(mockScope.products).toBe(undefined);
        expect(mockScope.error).toBe(undefined);
    });

    it('check service', function () {
      
        // var data = { search: '', page: 1, itemsByPage: 6 };

        // mockScope.init('');
        
        // expect(data.search).toEqual('');
        // expect(data.page).toEqual(1);
        // expect(data.itemsByPage).toEqual(6);

        // expect(mockScope.products).toBeDefined();

        // console.log(mockScope.products);

       

    })

});