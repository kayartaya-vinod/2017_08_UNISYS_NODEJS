// create-contact.js
// module name -> ./lib/controllers/create-contact

module.exports = (req, resp)=>{

	var ContactService = require("../service/contact-service-mongodb");
	var cs = new ContactService();
	cs.add(req.body)
	.then(data=>{
		resp.json({
			success: true,
			id: data.id
		});
	})
	.catch(err=>{
		resp.json({
			success: false,
			error: err
		});
	});
};