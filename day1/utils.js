// utils.js

module.exports.factorial = n=>{
	let f=1;
	for(let i=1; i<=n; i++){
		f*=i;
	}
	return f;
};

// module.exports.cube = function(n){
// 	return n*n*n;
// }

module.exports.cube = n=>n*n*n;