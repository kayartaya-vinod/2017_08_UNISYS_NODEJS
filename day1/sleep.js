module.exports = function(d){
	let d1 = Date.now();
	while(true){
		let d2 = Date.now();
		if(d2-d1>d) break;
	}
}