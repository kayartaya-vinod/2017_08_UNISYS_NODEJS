var ContactService = require("./lib/service/contact-service-mongodb");

var cs = new ContactService();

var id = "59a63c46f8424ff46fec19a3";

var _contact;

cs.get(id)
.then(data=>{
	console.log("----------------------------------------------------------------------- CALLED cs.get()");
	console.log(data);
	if(!data) return Promise.reject("No data found!");

	_contact = data;
	let email = data.email;
	if(email.endsWith("yahoo.com")){
		email = email.substring(0, email.indexOf("@")) + "@gmail.com";
	}
	else {
		email = email.substring(0, email.indexOf("@")) + "@yahoo.com";
	}
	data.email = email;
	return cs.update(data);
})
.then(data=>{
	console.log("----------------------------------------------------------------------- CALLED cs.update(..)");
	console.log(data);
	return cs.get(id);
})
.then(data=>{
	console.log("----------------------------------------------------------------------- CALLED cs.get() again");
	console.log(data);
	return cs.delete(id);
})
.then(data=>{
	console.log("----------------------------------------------------------------------- CALLED cs.delete()");
	console.log(data);
	return cs.add(_contact);
})
.then(data=>{
	console.log("----------------------------------------------------------------------- CALLED cs.add(..)");
	console.log("New data added with id: ", data);
	return cs.getAll();
})
.then(data=>{
	console.log("----------------------------------------------------------------------- CALLED cs.getAll()");
	console.log(`We have ${data.length} contacts`);
});


