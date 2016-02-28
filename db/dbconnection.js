var mysql = require('mysql');
var config = require('../config')();

// First you need to create a connection to the db
var conn = null;

var credentials = {
    host: "localhost",
    user: "root",
    password: "secret",
    database: "iexchange",
    multipleStatements: true
};
var jsonresult = '';

var mySqlConnection = {

    getdata: function (selectquery, callback) {

        conn = mysql.createConnection(credentials);

        conn.query(selectquery, function (err, rows, fields) {

            var params = {
                error_show: false,
                error_message: '',
                data: rows
            };

            callback(params);

        });
    },

    getcollection: function (selectquery, selectcount, callback) {

            conn = mysql.createConnection(credentials);

            conn.query(selectquery, function (err, rows, fields) {

            mySqlConnection.gettotal(rows, selectcount, callback);

        });
    },

    gettotal: function (data, selectcount, callback) {

        conn = mysql.createConnection(credentials);

        conn.query(selectcount, function (err, rows, fields) {
            var params = {
                NumItems: rows[0].total,
                //CurrentP: currentpage,
                //ItemsByPage:items_per_page,
                data: data
            };

            callback(params);
        });
    },

    checkdata: function (data, callback) {

        conn = mysql.createConnection(credentials);

        var select = "SELECT * FROM walkinlead WHERE email = " + conn.escape(data["email"]);

        conn.query(select, function (err, rows, fields) {

            if (rows.length > 0) {

                var params = {
                    error_show: true,
                    error_message: 'Email: ' + data["email"] + ' already exists',
                    data: [],
                };

                callback(params);
            }
            else
            {
                mySqlConnection.insertdata(data, callback);
            }
        });
    },

    insertdata: function (data, callback) {

        conn = mysql.createConnection(credentials);
        conn.query('INSERT INTO walkinlead SET ? ', data, function (err, result) {

            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

            var params = {
                error_show: false,
                error_message: '',
                data: [],
            };

            callback(params);
        });
    },

    updatedata: function (data, id, callback) {

        conn = mysql.createConnection(credentials);

        conn.query('UPDATE walkinlead SET ? WHERE walkinlead_id = ? ', [data, id], function (err, result) {

            if (err)
                console.log(err);

            var params = {
                title: 'User list',
                data: [],
            };

            callback(params);
        });
    },

    checkaccount: function (data, callback) {

        conn = mysql.createConnection(credentials);

        var select = "SELECT * FROM walkinlead WHERE email = " + conn.escape(data["email"]) + " AND passcode = " + conn.escape(data["passcode"]);

        conn.query(select, function (err, rows, fields) {

            if (rows.length > 0) {
                // there is an account
                callback();

            } else {
                // account not exist
                var params = {
                    error_message: 'email or/and password not valid '
                };

                callback(params);
            }
        });
    },
};

module.exports = mySqlConnection;
