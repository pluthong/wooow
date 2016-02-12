var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'customers',
   idAttribute: 'customersId',
});

var Product = DB.Model.extend({
    tableName: 'products',
    idAttribute: 'productId',
});


module.exports = {
    User: User,
    Product: Product
};