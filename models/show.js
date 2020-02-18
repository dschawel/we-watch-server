let mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    name: String,
    genre: String,
    year: Number,
    poster: String,
    // userId: String
})


module.exports = mongoose.model('show', showSchema)