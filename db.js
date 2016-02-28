
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'secret',
        database: 'iexchange',
        charset: 'utf8'
    }
});

var DB = require('bookshelf')(knex);

module.exports.DB = DB;