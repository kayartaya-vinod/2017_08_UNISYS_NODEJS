var cs = require("./lib/service/contact-service-promise");

cs.add({name: "Vinod", email: "vinod@vinod.co", phone: "9731424784"})
.then(resp=>{
	console.log("id", resp.id);
	return cs.add({name: "John", email: "john@mail.com", phone: "5551424784"});
})
.then(resp=>{
	console.log("id", resp.id);
	return cs.add({name: "Jane", email: "jane@mail.com", phone: "5553334784"});
})
.then(resp=>{
	console.log("id", resp.id);
	return cs.getAll();
})
.then(resp=>{
	console.log(`There are ${resp.length} contacts`);
	resp.forEach(d=>console.log(d));
})
.catch(err=>{
	console.error(err);
});