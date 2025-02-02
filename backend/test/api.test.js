const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { expect } = chai;

chai.use(chaiHttp);

describe("API Endpoints", () => {
  it("should retrieve all FAQs and translate them", (done) => {
    chai
      .request(server)
      .get("/api/faqs?lang=fr")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body[0].question).to.equal("Qu'est-ce que la FAQ?");
        done();
      });
  });

  it("should create and return a FAQ", (done) => {
    const faq = {
      translations: {
        question_en: "What is MongoDB?",
        question_hi: "MongoDB क्या है?",
      },
      answer: "MongoDB is a NoSQL database.",
    };
    chai
      .request(server)
      .post("/api/faqs")
      .send(faq)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.answer).to.equal("MongoDB is a NoSQL database.");
        done();
      });
  });
});
