var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));

var path = require('path');

module.exports = BaseController.extend({
    name: "SignupPOST",
    content: null,
    run: function (req, res, next) {

        var self = this;

        var input = JSON.parse(JSON.stringify(req.body));
        
        var jsondata =
           {
               first_name: input.first_name,
               last_name: input.last_name,
               email: input.join_email,
               passcode: input.join_password
           };

        this.create(jsondata, function (obj) {
            res.redirect('/signin/' + input.join_email);
        });
   
    },
    create: function (json, callback) {
        model.insert(json, callback);
    }
});