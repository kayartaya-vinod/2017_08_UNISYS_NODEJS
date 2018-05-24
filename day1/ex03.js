// ex03.js

var doSomething = require("./vinmodule");
var sleep = require("./sleep");
console.log("Start of script");

doSomething(function(){
	console.log("doing somthing without blocking...");
});

sleep(5000);
console.log("End of script");


