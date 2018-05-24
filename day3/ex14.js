// ex14.js
var express = require("express");
var server = express();
var port = 3000;
var path = require("path");

var webroot = path.join(__dirname, "www");
server.use(express.static(webroot));

server.get("/about", (req, resp)=>{
	resp.send("<h1>About page under construction</h1>");
});

server.get("/contact-us", (req, resp)=>{
	resp.send("<h1>Email us at vinod@vinod.co</h1>");
});

server.listen(port, ()=>{
	console.log(`server started at port $port}`);
});