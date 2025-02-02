import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FaqForm = ({ onSubmit }) => {
  const [language, setLanguage] = useState("en"); // Default to English
  const [question, setQuestion] = useState("");
  const [translations, setTranslations] = useState({ en: "" });
  const [answer, setAnswer] = useState("");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setTranslations({ ...translations, [language]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ translations, answer });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Select Language:</label>
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="fr">French</option>
      </select>

      <label>Question ({language}):</label>
      <input
        type="text"
        value={translations[language] || ""}
        onChange={handleQuestionChange}
        required
      />

      <label>Answer:</label>
      <CKEditor
        editor={ClassicEditor}
        data={answer}
        config={{
          language: language, // Change CKEditor language dynamically
        }}
        onChange={(event, editor) => {
          setAnswer(editor.getData());
        }}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FaqForm;
