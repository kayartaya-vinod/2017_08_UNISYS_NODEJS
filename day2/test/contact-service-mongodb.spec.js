// contact-service-mongodb.spec.js

var ContactService = require("../lib/service/contact-service-mongodb");
var {MongoClient, ObjectId} = require("mongodb");
var fs = require("fs");
var path = require("path");

var filename = path.join(__dirname, "..", "contacts-array.json");
var url = "mongodb://localhost/training";

var chai = require("chai");
chai.use(require("chai-as-promised")); // adds additional capability "eventually"
var expect = chai.expect;
var should = chai.should();

describe("Testing ContactService functions", function(){
	var cs = null;

	beforeEach(function(done){
		cs = new ContactService();

		var data = fs.readFileSync(filename, "utf-8");
		data = JSON.parse(data);
		MongoClient.connect(url, (err, db)=>{
			if(err) throw err;
			db.collection("contacts").remove({}, (err, resp)=>{
				if(err) throw err;

				db.collection("contacts").insert(data, (err, resp)=>{
					db.close();
					done();
				});
			});
		})
	});

	describe("Testing getAll() function", function(){
		it("should just pass", function(){
			return expect(cs.getAll()).to.eventually.have.length(100);
		});
	});


	describe("Testing add(contact) function", function(){
		it("should fail when mandatory fields are missing", function(){
			var c1 = {name: "Vinod", phone: "9731424784"};
			return expect(cs.add(c1)).to.be.rejected;
		});

		it("should add a valid contact", function(){
			var c1 = {name: "Vinod", email: "vinod@vinod.co", phone: "9731424784"};
			var c2 = {name: "John", email: "john@mail.com", phone: "5551424784"};
			
			return Promise.all([
				cs.add(c1).should.eventually.be.a("object").to.have.property("id"),
				cs.add(c2).should.eventually.be.a("object").to.have.property("id")
			]);
		});
	});

	describe("Testing get(id) function", function(){

		it("should get a contact for valid id", function(){

			var id = "59a546488c8a9fe49131ae98";
			var name = "Emlynn Mirams";

			return cs.get(id).should.eventually.be.a("object")
				.to.have.property("name")
				.to.equal(name)

		});
	});


});






