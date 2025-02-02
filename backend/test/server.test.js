const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { expect } = chai;

chai.use(chaiHttp);

describe("Server Test", () => {
  it("should start the server", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
