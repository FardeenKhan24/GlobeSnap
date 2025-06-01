const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    location: String,
    description: String,
    date: String,
    images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);
