const mongoose = require("mongoose");
const { expect } = require("chai");
const FAQ = require("../models/faq");

describe("FAQ Model", () => {
  before(async () => {
    // Connect to test database
    await mongoose.connect("mongodb://localhost:27017/test_db");
  });

  after(async () => {
    // Cleanup
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create a FAQ with translations", async () => {
    const faq = new FAQ({
      answer: "This is a test answer.",
      translations: {
        question_en: "What is the FAQ?",
        question_hi: "FAQ क्या है?",
        question_fr: "Qu'est-ce que la FAQ?",
      },
    });
    const savedFaq = await faq.save();
    expect(savedFaq).to.have.property("translations");
    expect(savedFaq.translations.question_en).to.equal("What is the FAQ?");
  });

  it("should correctly translate questions", async () => {
    const faq = new FAQ({
      answer: "Test answer",
      translations: {
        question_en: "What is Node.js?",
        question_fr: "Qu'est-ce que Node.js?",
      },
    });
    const savedFaq = await faq.save();
    const translated = savedFaq.getTranslatedQuestion("fr");
    expect(translated).to.equal("Qu'est-ce que Node.js?");
  });
});
