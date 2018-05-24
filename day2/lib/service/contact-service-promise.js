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

module.exports.add = contact=>{
	return new Promise((resolve, reject)=>{
		if(!contact || typeof contact!="object"){
			let err = {code: 1001};
			err.message = "'contact' was not supplied or was not an object";
			reject(err);
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
			reject(err); // err is the first parameter (always in node.js)
			return;
		}	

		fs.readFile(filename, "utf-8", (err, data)=>{
			if(err){
				reject(err);
			}
			else {
				data = JSON.parse(data);
				contact.id = ++data.idCounter;
				data.contacts.push(contact);
				fs.writeFile(filename, JSON.stringify(data), "utf-8", (err, status)=>{
					if(err){
						reject(err);
					}
					else {
						resolve({id: contact.id});
					}
				});
			}
		});	
	});
};


module.exports.getAll = ()=>{
	return new Promise((resolve, reject)=>{
		fs.readFile(filename, "utf-8", (err, data)=>{
			if(err){
				reject(err);
			}
			else {
				try{
					data = JSON.parse(data);
					resolve(data.contacts);
				}catch(e){
					var err = { code: 1003 };
					err.details = e;
					reject(err);
				}
			}
		});
	});
};
