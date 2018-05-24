var mc = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

var region = "New York";

mc.connect("mongodb://localhost/training", (err, db)=>{
	if(err) throw err;

	var contacts = db.collection("contacts");
	contacts.find({"state": region}).toArray((err, data)=>{
		if(err) throw err;

		if(data && data instanceof Array){
			console.log(`There are ${data.length} contacts from ${region}`);	
		}
		db.close();
	});
	
});
console.log("End of script!");