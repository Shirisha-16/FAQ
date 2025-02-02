const mongoose = require("mongoose");
const faqschema = new mongoose.Schema(
    {
        answer : {type:String , required:true},
        translations: {
            question_en: {type:String, required:true},
            question_hi: { type: String, default: "" }, // Hindi translation
            question_bn: { type: String, default: "" }, // Bengali translation
            question_fr: { type: String, default: "" }, // French translation
          },
    },
    {
        timestamps: true 
    }
);
  faqschema.methods.getTranslatedQuestion = function (languageCode) {
    return this.translations[languageCode] || this.translations.en;
  };
const FAQ = mongoose.model("FAQ",faqschema);
module.exports = FAQ;
