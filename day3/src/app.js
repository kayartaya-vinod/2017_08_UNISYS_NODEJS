// src/app.js
var $ = require("jquery");
window.jQuery = window.$ = $;

require("./styles/default.css");
require("./styles/another.css");
require("bootstrap-loader");

console.log("Hello, this is from app.js");

require("./second.js");


$("h1").html("Heading just got changed!");	

