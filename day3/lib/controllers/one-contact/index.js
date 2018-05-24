// index.js
// module name -> ./lib/controllers/one-contact

module.exports = (req, resp)=>{
	var ContactService = require("../../service/contact-service-mongodb");
	var cs = new ContactService();
	cs.get(req.params.id)
	.then(data=>{
		resp.json({
			success: true,
			data: data
		});
	})
	.catch(err=>{
		resp.json({
			success: false,
			error: err
		});
	});
};