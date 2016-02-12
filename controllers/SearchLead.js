var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({
    name: "SearchLead",
    content: null,
    run: function (req, res, next) {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        var customerId = user.customerId;

        var v = new View(res, 'search/index');

        if (req.query.word) {
            var params = {
                search: req.query.word,
                user: user
            };
        }
        else {
            var params = {
                search: '',
                user: user
            };
        }

        v.render(params);
    },
    getjson: function (req, res, next) {

        var user = req.user;

        if (user !== undefined) {
            user = user.toJSON();
        }

        var customerId = user.customerId;
        
        var v = new View(res, 'search/index');
        var w = req.body.search;
        var page = req.body.page;
        var itemsByPage = req.body.itemsByPage;
        console.log("page :" + page + ", itemsByPage :" + itemsByPage);
        if (w == "") {
            this.list(page, itemsByPage, customerId, function (obj) {
                v.json(obj);
            })
        }
        else {
            this.search(w, page, itemsByPage,customerId, function (obj) {
                v.json(obj);
            })
        }
    },
    list: function (page, itempage,custid, callback) {
        model.getlist(page, itempage,custid, callback);
    },
    search: function (wd, page, itempage,custid, callback) {
        model.searchlead(wd, page, itempage,custid, callback);
    }

});