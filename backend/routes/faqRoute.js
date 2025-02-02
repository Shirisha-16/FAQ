const express = require("express");
const axios = require("axios");
const FAQ = require("../models/faq");
const redisClient = require("../utils/redisclient");


const router = express.Router();

// Google Translate Service URL
const TRANSLATE_API_URL = "http://localhost:8000/translate"; // Flask service URL

// Function to translate text
async function translateText(text, srcLang = "en", destLang = "fr") {
  try {
    const response = await axios.post(TRANSLATE_API_URL, {
      text,
      src: srcLang,
      dest: destLang,
    });
    return response.data.translated_text;
  } catch (error) {
    console.error("Translation error:", error.message);
    return text; // Fallback to original text
  }
}

// GET all FAQs (with translation)
router.get("/", async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs:${lang}`;

    // Check Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const faqs = await FAQ.find();

    // Translate FAQs dynamically
    const formattedFaqs = await Promise.all(
      faqs.map(async (faq) => ({
        id: faq._id,
        question: lang === "en" ? faq.translations.en : await translateText(faq.translations.en, "en", lang),
        answer: faq.answer,
      }))
    );

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(formattedFaqs));

    res.json(formattedFaqs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// GET single FAQ (with translation)
router.get("/:id", async (req, res) => {
  try {
    const faqId = req.params.id;
    const lang = req.query.lang || "en";
    const cacheKey = `faq:${faqId}:${lang}`;

    // Check cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const faq = await FAQ.findById(faqId);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    // Translate question
    const translatedQuestion = lang === "en" ? faq.translations.en : await translateText(faq.translations.en, "en", lang);

    const response = {
      id: faq._id,
      question: translatedQuestion,
      answer: faq.answer,
    };

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;

