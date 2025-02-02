import React, { useState, useEffect } from "react";
import FaqForm from "./faqform";

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetch(`http://localhost:8000/api/faqs`)
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  const handleFaqSubmit = (faq) => {
    fetch("http://localhost:8000/api/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faq),
    })
      .then((res) => res.json())
      .then((newFaq) => setFaqs([...faqs, newFaq]));
  };

  return (
    <div>
      <h1>Multilingual FAQ Manager</h1>
      <FaqForm onSubmit={handleFaqSubmit} />

      <label>Select Language:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="bn">Bengali</option>
        <option value="fr">French</option>
      </select>

      <h2>FAQs</h2>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <strong>
              {faq.translations[language] || faq.translations.en}
            </strong>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

