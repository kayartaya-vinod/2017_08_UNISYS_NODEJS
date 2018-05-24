// contact-service-async.js

var path = require("path");
var fs = require("fs");
var filename = path.join(__dirname, "contacts.json");

// if the file does not exist, create one
if(!fs.existsSync(filename)){
	var data = {};
	data.idCounter = 0;
	data.contacts = [];
	fs.writeFileSync(filename, JSON.stringify(data), "utf-8");
}



module.exports.add = function(contact, callback){
	if(!callback || typeof callback!="function"){
		throw new Error("callback was not supplied or was not a function!");
	}
	
	// by invoking the callback function, we communicate to the caller of this function
	if(!contact || typeof contact!="object"){
		let err = {code: 1001};
		err.message = "'contact' was not supplied or was not an object";
		callback(err); // err is the first parameter (always in node.js)
		return;
	}

	var requiredFields = ["name", "email", "phone"];
	var missingFields = [];
	requiredFields.forEach(field=>{
		if(!(field in contact) || !contact[field]){
			missingFields.push(field);
		}
	});
	if(missingFields.length){
		let err = {code: 1002};
		err.message = "Missing required fields: " + missingFields.join();
		callback(err); // err is the first parameter (always in node.js)
		return;
	}

	fs.readFile(filename, "utf-8", (err, data)=>{
		if(err){
			callback(err);
		}
		else {
			data = JSON.parse(data);
			contact.id = ++data.idCounter;
			data.contacts.push(contact);
			fs.writeFile(filename, JSON.stringify(data), "utf-8", (err, status)=>{
				if(err){
					callback(err);
				}
				else {
					callback(null, {id: contact.id});
				}
			});
		}
	});
};

module.exports.getAll = callback=>{
	if(!callback || typeof callback!="function"){
		throw new Error("callback was not supplied or was not a function!");
	}

	fs.readFile(filename, "utf-8", (err, data)=>{
		if(err){
			callback(err);
			return;
		}
		else {
			try{
				data = JSON.parse(data);
				callback(null, data.contacts);
			}catch(e){
				var err = { code: 1003 };
				err.details = e;
				callback(err);
			}
		}
	});
	
};
module.exports.get = (id, callback)=>{
	if(!callback || typeof callback!="function"){
		throw new Error("callback was not supplied or was not a function!");
	}
	if(!id || typeof id!="number"){
		let err = {code: 1004};
		err.message = "'id' was not supplied or was not an number";
		callback(err); 
		return;
	}

	fs.readFile(filename, "utf-8", (err, data)=>{
		if(err){
			callback(err);
			return;
		}
		else {
			try{
				data = JSON.parse(data);
				callback(null, data.contacts.find(c=>c.id==id));
			}catch(e){
				var err = { code: 1003 };
				err.details = e;
				callback(err);
			}
		}
	});
	
};
















