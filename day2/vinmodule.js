// vinmodule.js

module.exports.sayHello = function(name){
	// must return a promise
	return new Promise(function(resolve, reject){
		if(name){
			resolve({msg: `Hello, ${name}!`, when: new Date()});	
		}
		else {
			reject("A name was expected, but did not get one!");
		}
		
	});
};