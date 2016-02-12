var Model = require("./Base"),
	crypto = require("crypto"),
	model = new Model();
var mysql = require("../db/dbconnection")

var ContentModel = model.extend({

    insert: function (data,cb) {
        mysql.checkdata(data,cb);
    },

    update: function (data, id, cb) {

        mysql.updatedata(data, id, cb);
    },

    getlist: function (page, items_per_page,custid, cb) {

        var offset = (page - 1) * items_per_page;

        // build query
        var selectquery = "SELECT productId, date_format(createDate,'%Y-%m-%d %H:%i:%s') as createDate, ";
        selectquery += " name, description, category, productImageUrl, price FROM products ";
        selectquery += "WHERE   productCustomerId = '" + custid + "'";
        selectquery += "LIMIT " + offset + "," + items_per_page;

        console.log(selectquery);

        var selectCount = "SELECT COUNT(1) AS total FROM products WHERE   productCustomerId = '" + custid + "'";

        return mysql.getcollection(page, items_per_page, selectquery, selectCount, cb);
    },

	getlead: function (id,cb) {

	    var selectquery = "SELECT * FROM products WHERE productId = " + id;

	    return mysql.getdata(selectquery, cb);
	},

	searchlead: function (word, page, items_per_page,custid, cb) {

	    var offset = (page - 1) * items_per_page;

	    // build query
	    var searchquery = "SELECT productId, date_format(createDate,'%Y-%m-%d %H:%i:%s') as createDate, ";
	    searchquery += " name, description, category, productImageUrl, price FROM products ";
	    searchquery += "WHERE name LIKE '%" + word + "%' and productCustomerId = " + custid;
	    searchquery += "LIMIT " + offset + "," + items_per_page;

	    var selectCount = "SELECT COUNT(1) AS total FROM products ";
	    selectCount += "WHERE name LIKE '%" + word + "%' AND productCustomerId = '" + custid + "'";
	    return mysql.getcollection(page, items_per_page, searchquery, selectCount, cb);
	},

	checkLogin: function (data, cb) {
        mysql.checkaccount(data, cb);
	}
});

module.exports = ContentModel;