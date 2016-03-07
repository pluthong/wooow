var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'customers',
   idAttribute: 'customersId',
});

var Product = DB.Model.extend({
    tableName: 'products',
    idAttribute: 'productId',
    images: function () {
        return this.hasMany(ProductImage, 'productImageProductId');
    }
});

var ProductImage = DB.Model.extend({
    tableName: 'productimages',
    idAttribute: 'productImageId',
    product: function () {
        return this.belongsTo(Product, 'productId');
    }
});


module.exports = {
    User: User,
    Product: Product,
    ProductImage: ProductImage
};