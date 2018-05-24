// contact-service.js
// synchronous API (blocking code)

var requiredFields = ["name", "email", "phone"];

module.exports.add = contact=>{

	if(!contact || typeof contact!="object"){
		throw new Error("'contact' was not supplied or was not an object!");
	}

	var missingFields = [];

	requiredFields.forEach(field=>{
		if(!(field in contact) || !contact[field]){
			missingFields.push(field);
		}
	});

	if(missingFields.length){
		throw new Error("Missing required fields: " + missingFields.join());
	}

	contact.id = ++idCounter;
	contacts.push(contact);
	return contact.id;
};

module.exports.get = id=>{
	if(!id || typeof id!="number"){
		throw new Error("id was not supplied or was not a number");
	}

	return contacts.find(c=>c.id==id);
};

module.exports.getAll = ()=>{};

module.exports.update = contact=>{};

module.exports.delete = id=>{};

var contacts = [{
	name: "Vinod",
	"email": "vinod@vinod.co",
	"phone": "9731424784",
	"id": 1
},{
	name: "John Doe",
	"email": "johndoe@mail.com",
	"phone": "555883322",
	"id": 2
}];

var idCounter = contacts.length;















