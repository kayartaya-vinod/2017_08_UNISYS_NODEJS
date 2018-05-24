var https = require("https");

var options = {
	host: "vinod.co",
	path: "/rest/contacts/1"
};
https.request(options, resp=>{
	var out = "";
	resp.on("data", data=>{
		out += data;
	});

	resp.on("end", ()=>{
		console.log(out);
	});
}).end();