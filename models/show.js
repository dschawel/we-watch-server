let mongoose = require('mongoose')

const showSchema = new mongoose.Schema({
    title: String,
    type: String,
    year: String,
    poster: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Show', showSchema)