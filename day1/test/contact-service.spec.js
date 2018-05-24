// contact-service.spec.js

var cs = require("../lib/service/contact-service");
var {expect} = require("chai");
var assert = require("assert");

// "describe" function defines a new test suite
describe("Testing contact-service (sync) functions", function(){

	describe("Testing for add() function", function(){
		
		// "it" function defines a new test-spec (test case)
		it("should throw an error when non object was supplied to add()", function(){

			expect(function(){
				cs.add(100);
			}).to.throw(Error);

		});

		it("should return an id generated", function(){
			var c = {};
			c.name = "Vinod";
			c.email = "vinod@vinod.co";
			c.phone = "973124784";

			var id = cs.add(c);
			expect(c).to.have.property("id").to.equal(id);
		});
	});
	


	describe("Testing get() function", function(){
		it("should throw an error when id is not a number", function(){
			expect(function(){
				cs.get("asd");
			}).to.throw(Error);
		});
		it("should throw an error when id is not supplied", function(){
			expect(function(){
				cs.get();
			}).to.throw(Error);
		});

		it("should get a valid contact object", function(){
			var id = 1;
			var c = cs.get(id);
			expect(c).to.be.a("object")
				.to.have.property("name")
				.to.equal("Vinod");
			expect(c).to.have.property("email").to.equal("vinod@vinod.co");
		});
	});
});






