// contact-service-mongodb.js

// import {MongoClient, ObjectId} from "mongodb";
var {MongoClient, ObjectId} = require("mongodb");

const url = "mongodb://localhost/training";

class ContactService {

	add(contact){
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

			MongoClient.connect(url, (err, db)=>{
				if(err){
					reject(err);
					return;
				}
				if(contact._id){
					if(typeof contact._id=="string"){
						try{
							contact._id = ObjectId(contact._id);
						}
						catch(e){
							delete contact._id;		
						}
					}
				}
				db.collection("contacts").insert(contact, (err, resp)=>{
					if(err){
						reject(err);
						db.close();
						return;
					}
					resolve({id: resp.insertedIds[0]});
					db.close();
				});
			});


		});
	}

	get(id){
		return new Promise((resolve, reject)=>{
			if(!id || typeof id!="string"){
				var err = { code: 1001};
				err.message = "Id must be supplied as a string";
				reject(err);
				return;
			}

			try{
				id = ObjectId(id);
			}catch(e){
				reject(e);
				return;
			}

			MongoClient.connect(url, (err, db)=>{
				if(err){
					reject(err);
					return;
				}
				db.collection("contacts").findOne({_id: id}, (err, doc)=>{
					if(err){
						reject(err);
						db.close();
						return;
					}
					resolve(doc);
					db.close();
				});
			});
		});
	}

	update(contact){
		return new Promise((resolve, reject)=>{
			if(!contact || typeof contact!="object"){
				let err = {code: 1001};
				err.message = "'contact' was not supplied or was not an object";
				reject(err);
				return;
			}

			var requiredFields = ["_id", "name", "email", "phone"];
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

			MongoClient.connect(url, (err, db)=>{
				if(err){
					reject(err);
					return;
				}
				try{
					// convert string id into ObjectId instance
					contact._id = ObjectId(contact._id);
				}
				catch(e){
					reject(e);
					return;
				}
				db.collection("contacts").update({_id: contact._id}, contact, (err, resp)=>{
					if(err){
						reject(err);
						db.close();
						return;
					}
					resolve({id: resp.result});
					db.close();
				});
			});
		});
	}
	delete(id){
		return new Promise((resolve, reject)=>{
			if(!id || typeof id!="string"){
				var err = { code: 1001};
				err.message = "Id must be supplied as a string";
				reject(err);
				return;
			}

			try{
				id = ObjectId(id);
			}catch(e){
				reject(e);
				return;
			}

			MongoClient.connect(url, (err, db)=>{
				if(err){
					reject(err);
					return;
				}
				db.collection("contacts").remove({_id: id}, (err, doc)=>{
					if(err){
						reject(err);
						db.close();
						return;
					}
					resolve(doc.result);
					db.close();
				});
			});
		});
	}


	getAll(){
		return new Promise((resolve, reject)=>{
			MongoClient.connect(url, (err, db)=>{
				if(err){
					reject(err);
					return;
				}
				db.collection("contacts").find().toArray((err, docs)=>{
					if(err){
						reject(err);
						db.close();
						return;
					}
					resolve(docs);
					db.close();
				});
			});
		});
	}

}

module.exports = ContactService;