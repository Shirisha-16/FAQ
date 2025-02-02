const axios = require("axios");

const translateText = async (text, languages = ["hi", "bn", "fr"]) => {
  try {
    const response = await axios.post("http://localhost:5001/translate", {
      text,
      languages,
    });
    return response.data;
  } catch (error) {
    console.error("Translation failed, using English fallback.", error);
    let fallbackTranslations = {};
    languages.forEach((lang) => (fallbackTranslations[lang] = text));
    return fallbackTranslations;
  }
};

module.exports = translateText;
