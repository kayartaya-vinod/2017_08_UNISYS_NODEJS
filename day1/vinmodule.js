
function doSomethingAsync(callback){
	setTimeout(callback, 2000);
}

module.exports = doSomethingAsync;