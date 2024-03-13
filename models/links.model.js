const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = new Schema(
    {
        long_url: { type: String, required: true },
        short_url: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Links', Link);
