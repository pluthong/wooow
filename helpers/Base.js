module.exports = function(response, template) {
	this.response = response;
	this.template = template;
};
module.exports.prototype = {
	render: function(data) {
		if(this.response && this.template) {
			this.response.render(this.template, data);
		}
	},
	json: function (data) {
	    if (this.response)
	    {
	        this.response.end(JSON.stringify(data));
	    }
	}
}