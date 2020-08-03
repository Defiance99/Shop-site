const request = require("supertest");
const assert = require("assert");

const app = require("./server").app;

describe("Express Router Tests", function() {
    it ("Should return status code 200 OK", function(done) {

        request(app)
            .get("/")
            .expect(200)
            .end(done())
    });
    it ("Should return status code 200 OK", function(done) {
        
        request(app)
            .post("/users/register")
            .expect(200)
            .end(done())
    });
});