const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Test GET /api/convert with a valid input", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        if (err) console.error(err);
        assert.equal(res.status, 200);
        const { initNum, initUnit, returnNum, returnUnit, string } = res.body;
        assert.equal(initNum, 10);
        assert.equal(initUnit, "L");
        assert.approximately(returnNum, 2.64172, 0.001);
        assert.equal(returnUnit, "gal");
        assert.equal(string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });
  test("Test GET /api/convert with an invalid input (unit)", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        if (err) console.error(err);
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid unit");
        done();
      });
  });
  test("Test GET /api/convert with an invalid number", (done) => {
    chai
      .request(server)
      .get(`/api/convert?input=${encodeURIComponent("3/7.2/4kg")}`)
      .end((err, res) => {
        if (err) console.error(err);
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number");
        done();
      });
  });
  test("Test GET /api/convert with an invalid number AND unit", (done) => {
    chai
      .request(server)
      .get(`/api/convert?input=${encodeURIComponent("3/7.2/4kilomegagram")}`)
      .end((err, res) => {
        if (err) console.error(err);
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number and unit");
        done();
      });
  });
  test("Test GET /api/convert with a valid input with no number", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        if (err) console.error(err);
        assert.equal(res.status, 200);
        const { initNum, initUnit, returnNum, returnUnit, string } = res.body;
        assert.equal(initNum, 1);
        assert.equal(initUnit, "kg");
        assert.approximately(returnNum, 2.20462, 0.001);
        assert.equal(returnUnit, "lbs");
        assert.equal(string, "1 kilograms converts to 2.20462 pounds");
        done();
      });
  });
});
