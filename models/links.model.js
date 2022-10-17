const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Link = new Schema(
    {
        longURL: { type: String, required: true },
        shortURL: { type: String, required: true },
        qrCode: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Links', Link)
