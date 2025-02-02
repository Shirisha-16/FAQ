const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { expect } = chai;

chai.use(chaiHttp);

describe("FAQ Routes", () => {
  it("should get all FAQs", (done) => {
    chai
      .request(server)
      .get("/api/faqs")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("array");
        done();
      });
  });

  it("should create a new FAQ", (done) => {
    const faq = {
      translations: {
        question_en: "What is Express?",
        question_hi: "Express क्या है?",
      },
      answer: "Express is a web framework for Node.js.",
    };
    chai
      .request(server)
      .post("/api/faqs")
      .send(faq)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.translations.question_en).to.equal("What is Express?");
        done();
      });
  });
});
