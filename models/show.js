let mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    name: String,
    genre: String,
    year: Number,
    poster: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Show', showSchema)