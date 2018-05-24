var http = require("https");

var options = {
	method: "GET",
	host: "vinod.co",
	path: "/rest/contacts",
	headers: {
		"Accept": "application/json"
	}
};

var handler = resp=>{
	var str="", count=0;

	resp.on("data", chunk=>{
		str+=chunk;
		count++;
	});
	
	resp.on("end", ()=>{
		console.log("Total chunks receieved is", count);
		var response = JSON.parse(str);
		var contacts = response.data;
		console.log(`There are ${contacts.length} contacts`);
	});
};

http.request(options, handler).end();