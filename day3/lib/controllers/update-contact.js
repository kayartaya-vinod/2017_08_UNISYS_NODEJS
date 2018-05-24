// update-contact.js

module.exports = (req, resp)=>{

	var ContactService = require("../service/contact-service-mongodb");
	var cs = new ContactService();

	req.body._id = req.params.id;

	cs.update(req.body)
	.then(data=>{
		resp.json({
			success: true,
			data: req.body
		});
	})
	.catch(err=>{
		resp.json({
			success: false,
			error: err
		});
	});
};