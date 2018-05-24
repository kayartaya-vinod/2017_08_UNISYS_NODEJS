var mc = require("mongodb").MongoClient;

mc.connect("mongodb://localhost:27017/training", (err, db)=>{
	if(err) throw err;

	var contacts = db.collection("contacts");

	var c = {};
	c.name = "Vinod";
	c.email = "vinod@vinod.co";
	c.phone = "9731424784";

	contacts.insert(c, (err, resp)=>{
		if(err) throw err;

		console.log("Id is", resp.insertedIds[0]);
		db.close();
	});
});
console.log("End of script!");