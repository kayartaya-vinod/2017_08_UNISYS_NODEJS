// contact-service-async.spec.js

var cs = require("../lib/service/contact-service-async");
var {expect} = require("chai");
var path = require("path");
var fs = require("fs");
var filename = path.join(__dirname, "..", "lib", "service", "contacts.json");

describe("Testing contact-service-async functions", function(){

	// executes for each one of the "it" functions
	beforeEach(function(){
		
		var data = {};
		data.idCounter = 0;
		data.contacts = [];
		fs.writeFileSync(filename, JSON.stringify(data), "utf-8");
	});

	describe("Testing the add() function", function(){

		it("should fail when no callback was supplied", function(){
			expect(function(){
				cs.add();
			}).to.throw(Error);
		});

		it("should receive an error, when name is not supplied", function(done){
			cs.add({}, (err)=>{
				expect(err).to.be.a("object");
				expect(err).to.have.property("code").to.equal(1002);
				done();
			});
		});

		it("should add a valid contact", function(done){
			// the argument "done" can be of any name, but the presence of
			// a variable there makes mocha supply a function. This function
			// should be invoked when the async callback is finished.

			var c = {};
			c.name = "Vinod";
			c.email = "vinod@viond.co";
			c.phone = "9731424784";

			cs.add(c, function(err, resp){
				expect(err).to.equal(null);
				expect(resp).to.be.a("object")
					.to.have.property("id")
					.to.equal(c.id);
				done();
			});

		});

	});


	describe("Testing getAll() function", function(){
		// hook for this specific test suite
		beforeEach(function(){
			var data = {};
			data.idCounter = 2;
			data.contacts = [];
			data.contacts.push({name: "John", email: "john@mail.com", phone: "5552228833"});
			data.contacts.push({name: "Jane", email: "jane@mail.com", phone: "5552227733"});
			fs.writeFileSync(filename, JSON.stringify(data), "utf-8");
		});

		it("should fail when no callback is supplied", function(){
			expect(function(){
				cs.getAll();
			}).to.throw(Error);
		});

		it("should get 2 contacts", function(done){
			cs.getAll(function(err, data){
				expect(data).to.have.length(2);
				done();
			});
		});
	});

	describe("Testing get() function", function(){
		// hook for this specific test suite
		beforeEach(function(){
			var data = {};
			data.idCounter = 2;
			data.contacts = [];
			data.contacts.push({id: 1, name: "John", email: "john@mail.com", phone: "5552228833"});
			data.contacts.push({id: 2, name: "Jane", email: "jane@mail.com", phone: "5552227733"});
			fs.writeFileSync(filename, JSON.stringify(data), "utf-8");
		});

		it("should fail when no callback is supplied", function(){
			expect(function(){
				cs.get();
			}).to.throw(Error);
		});
		it("should fail when no id is supplied", function(finished){
			cs.get(undefined, function(err, data){
				expect(err).to.be.a("object")
					.to.have.property("code")
					.equal(1004);
				finished();
			});
		});
		it("should get the data for valid id", function(done){
			cs.get(1, function(err, data){
				expect(err).to.equal(null);
				expect(data).to.be.a("object")
					.to.have.property("name")
					.to.equal("John");
				done();
			});
		});
	});
});

