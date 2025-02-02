const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
    username: { type: String, required: false },
    question: { type: String, required: true },
    answer: { type: String, required: false }, // Set this to false to make it optional
    translations: [
        {
            lang: { type: String, required: true },
            question: { type: String, required: true },
            answer: { type: String, required: false }, // Make answer optional in translations too
        },
    ],
});

const Faq = mongoose.model('Faq', FaqSchema);

module.exports = { Faq }
