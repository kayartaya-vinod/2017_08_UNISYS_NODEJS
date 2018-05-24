// This file is a module, and the module is the basename of the file ("table")
// A module must export something, otherwise, an empty object is exported


module.exports = function(num=10){
	console.log(`Table for ${num} is:`);
	for(var i=1; i<=10; i++){
		console.log(`${num} * ${i} = ${num*i}`);
	}
}
