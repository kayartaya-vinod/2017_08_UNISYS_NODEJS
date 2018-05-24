// ex05.js

console.log("Start of script");
var {sayHello} = require("./vinmodule");

sayHello("Vinod")
.then(resp=>{
	console.log(resp.msg, resp.when);
	return sayHello("Shyam");
})
.then(resp=>{
	console.log(resp.msg, resp.when);
	return sayHello(); // skips to the catch callback
})
.then(resp=>{
	console.log(resp.msg, resp.when);
	return sayHello("Kiran");
})
.catch(err=>{
	console.error("Promise rejected with error:", err);
});

console.log("End of script!");