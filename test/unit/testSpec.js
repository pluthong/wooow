describe('test specification', function () {


    var counter;

    beforeEach(function () {
        counter = 0;
    });

    it('create variable', function () {
        expect(counter).toEqual(0);
    })


    it('increment variable', function () {
        counter++;
        expect(counter).toEqual(1);
    })


    it('decrement variable', function () {
        counter--;
        expect(counter).toEqual(-1);
    })
});