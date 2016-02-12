var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));

var path = require('path');

module.exports = BaseController.extend({
    name: "SigninPOST",
    content: null,
    run: function (req, res, next) {

        var self = this;

        var input = JSON.parse(JSON.stringify(req.body));
        
        var jsondata =
           {
               email: input.join_email,
               passcode: input.join_password
           };

        this.check(jsondata, function (obj) {

            if (obj) {
                var v = new View(res, 'signin/index');
                v.render(obj);
            } else {
                res.redirect('/');
            }
        });

    },
    check: function (json, callback) {
        model.checkLogin(json, callback);
    }
});