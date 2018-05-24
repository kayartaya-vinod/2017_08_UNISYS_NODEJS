var {factorial, cube} = require("./utils");
var utils = require("./utils");

var n = 5;
console.log(`factorial of ${n} is`, factorial(n));
console.log(`cube of ${n} is`, cube(n));

console.log(`factorial of ${n} is`, utils.factorial(n));
console.log(`cube of ${n} is`, utils.cube(n));

