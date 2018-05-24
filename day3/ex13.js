var http = require("http");
var server = http.createServer((req, resp)=>{
	console.log("Received a request for ", req.url);
	resp.write("<h1>Hello, world!</h1>");
	resp.write("<hr />");
	resp.end("<p>Served hot from node.js</p>");
});

var port = 7001;
server.listen(port, ()=>{
	console.log("Server listening at port", port)
});
console.log("Starting the server....");