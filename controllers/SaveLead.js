var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));
var path = require('path');
module.exports = BaseController.extend({
    name: "SaveLead",
    content: null,
    run: function (req, res, next) {
        var self = this;

        var input = JSON.parse(JSON.stringify(req.body));

        var filename = req.files[0] ? req.files[0].filename : '';

        console.log(filename);
    
        var jsondata =
           {
               email: input.email,
               first_name: input.firstname,
               last_name: input.lastname,
               phone: input.phone,
               photo_path: filename
           };

        if (input.leadid == "") {

            this.create(jsondata, function (obj) {
                var v = new View(res, 'lead/index');
                v.render(obj);
            })
        }
        else {

            if (!filename.length)
            {
                delete jsondata.photo_path;
            }
           

            this.edit(jsondata, input.leadid, function (obj) {
                //var v = new View(res, 'lead/search');
                //v.render(obj);
                res.redirect('/search-lead')
            })

        }

    },
    create: function (json, callback) {

        model.insert(json, callback);

    },
    edit: function (json, id, callback) {

        model.update(json, id, callback);

    }
});