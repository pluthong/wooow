var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "Lead",
	content: null,
	run: function(req, res, next) {
	    var self = this;

	    if (req.params.id) {

	        this.edit(req.params.id, function (obj) {
	            var v = new View(res, 'lead/index');
	            v.render(obj);
	        })
	    }
	    else
	    {
	      
	        this.create("0",function (obj) {
	            var v = new View(res, 'lead/index');
	            v.render(obj);
	        })
	    }
		
	},
	create: function (id, callback) {

	    model.getlead(id, callback);

	},
	edit: function (id,callback) {

	    model.getlead(id, callback);

	}
});