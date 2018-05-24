var mc = require("mongodb").MongoClient;

mc.connect("mongodb://localhost:27017/training", (err, db)=>{
	if(err) throw err;

	var contacts = db.collection("contacts");

	contacts.findOne({_id: 1}, (err, c)=>{
		console.log(c);
		db.close();
	});
});
console.log("End of script!");