var path = require("path");
var fs = require("fs");


var filename = path.join(__dirname, "package.json");
console.log("Reading the file", filename);

var exists = fs.existsSync(filename);
if(exists){
	console.log("File exists!");
	fs.readFile(filename, "UTF-8", (err, data)=>{
		if(err){
			throw err;
		}
		else {
			console.log(data);
		}
	});
}
else {
	console.log("File does not exist!");
}

console.log("End of script!");
console.log("--------------")
