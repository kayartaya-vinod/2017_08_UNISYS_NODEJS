// all-contacts.js

var ContactService = require("../service/contact-service-mongodb");

module.exports = (req, resp)=>{
	var cs = new ContactService();
	var out = {};

	cs.getAll()
	.then(data=>{
		out.success = true;
		out.data = data;
		resp.json(out);
	})
	.catch(err=>{
		out.success = false;
		out.error = err;
		resp.json(out);
	});
};