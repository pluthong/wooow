var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({
    name: "SignIn",
    content: null,
    run: function (req, res, next) {
        var self = this;
        var params;

        if (req.params.email) {

             params = {
                view_email: req.params.email
            };

            this.getContent(function () {
                var v = new View(res, 'signin/index');
                v.render(params);
            })
        }
        else {

            params = {
                view_email: ""
            };
            this.getContent(function () {
                var v = new View(res, 'signin/index');
                v.render(params);
            })
        }

      
    },
    getContent: function (callback) {
        callback();
    }
});