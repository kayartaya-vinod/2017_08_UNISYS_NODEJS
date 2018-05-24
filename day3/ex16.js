var express = require("express");
var app = express();
app.use(express.static("www"));
var port = 3000;
var session = require('express-session')
app.use(session({
	secret: "topsecret"
}))

app.get("/test", (req, resp)=>{
	
	var counter = req.session.counter || 0;
	counter++;
	req.session.counter = counter;

	console.log(Object.keys(req.session));
	resp.end(`<h1>You visited this ${counter} times</h2>`);
});



app.listen(port, ()=>{
	console.log("Server started at port", port);
});

