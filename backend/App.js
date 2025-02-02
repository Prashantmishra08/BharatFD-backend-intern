const express = require("express");
const connectDB = require("./Db/connection.db.js");
const { Faq } = require("./Models/Faq.schema.js");
const cors = require("cors");
const fetch = require('node-fetch'); 

const app = express();

app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Function to translate text
const translateText = async (text, targetLang) => {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    
    if (!response.ok) {
      throw new Error(`Translation failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;  // Return original text if translation fails
  }
};

// POST API for user FAQs (with translations)
app.post("/api", async (req, res) => {
  const { question, answer, username } = req.body;

  if (!question || !answer || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const langs = ["hi", "bn"];
  const translations = [];

  try {
    for (let lang of langs) {
      const QuestionTranslated = await translateText(question, lang);
      const AnswerTranslated = await translateText(answer, lang);
      translations.push({ lang, question: QuestionTranslated, answer: AnswerTranslated });
    }

    const newFaq = new Faq({ username, question, answer, translations });
    await newFaq.save();
    res.status(201).json({ message: 'FAQ saved successfully', faq: newFaq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving FAQ' });
  }
});

// GET API for FAQ
app.get("/admin", async (req, res) => {
    try {
      const faqs = await Faq.find();
      res.status(200).json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Edit an FAQ
  app.put("/admin/:id", async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
  
    try {
      const faq = await Faq.findById(id);
      if (!faq) return res.status(404).json({ error: "FAQ not found" });
  
      faq.question = question || faq.question;
      faq.answer = answer || faq.answer;
      await faq.save();
  
      res.status(200).json({ message: "FAQ updated successfully", faq });
    } catch (error) {
      console.error("Error updating FAQ:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Delete an FAQ
  app.delete("/admin/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const faq = await Faq.findByIdAndDelete(id);
      if (!faq) return res.status(404).json({ error: "FAQ not found" });
  
      res.status(200).json({ message: "FAQ deleted successfully" });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
// GET API for user FAQs (fetch with optional translations)
app.get("/api/faqs", async (req, res) => {
  try {
    const lang = req.query.lang || "en"; // Default to English
    const faqs = await Faq.find();
    const translatedFaqs = faqs.map(faq => {
      const translation = faq.translations.find(t => t.lang === lang);
      return {
        _id: faq._id,
        username: faq.username,
        question: translation ? translation.question : faq.question,
        answer: translation ? translation.answer : faq.answer
      };
    });

    res.status(200).json(translatedFaqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Start Server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
