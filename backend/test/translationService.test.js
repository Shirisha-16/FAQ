const axios = require("axios");
const { expect } = require("chai");

describe("Translation Service", () => {
  it("should translate text from English to French", async () => {
    const response = await axios.post("http://localhost:8000/translate", {
      text: "Hello",
      src: "en",
      dest: "fr",
    });
    expect(response.data.translated_text).to.equal("Bonjour");
  });

  it("should return an error for unsupported languages", async () => {
    try {
      await axios.post("http://localhost:8000/translate", {
        text: "Hello",
        src: "en",
        dest: "xyz", // Unsupported language
      });
    } catch (error) {
      expect(error.response.status).to.equal(400);
    }
  });
});
