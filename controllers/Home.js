var BaseController = require("./Base"),
	View = require("../helpers/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "Home",
	content: null,
	run: function(req, res, next) {
		var self = this;
		this.getContent(function() {
			var v = new View(res, 'home/index');
			v.render(self.content);
		})
	},
	getContent: function(callback) {
		callback();
	}
});