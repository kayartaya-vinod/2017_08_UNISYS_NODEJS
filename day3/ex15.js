// ex15.js
// a simple rest service for address book app

var express = require("express");
var app = express();
app.use(express.static("www"));

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var morgan = require("morgan");
app.use(morgan("combined"));

var port = 3000;

var baseUrl = "/api/contacts";
var controllerPath = "./lib/controllers";

app.get(`${baseUrl}`, require(`${controllerPath}/all-contacts`));
app.get(`${baseUrl}/:id`, require(`${controllerPath}/one-contact`));
app.post(`${baseUrl}`, require(`${controllerPath}/create-contact`));
app.put(`${baseUrl}/:id`, require(`${controllerPath}/update-contact`));

app.listen(port, ()=>{
	console.log("Server started at port", port);
});

