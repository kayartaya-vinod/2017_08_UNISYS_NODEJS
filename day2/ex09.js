var mc = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

var id = "59a52bc4b0c11de300c3dc9a";

mc.connect("mongodb://localhost/training", (err, db)=>{
	if(err) throw err;

	var contacts = db.collection("contacts");

	contacts.findOne({_id: ObjectId(id)}, (err, c)=>{
		if(err) throw err;

		console.log(c);
		db.close();
	});
});
console.log("End of script!");