let mongoose = require('mongoose')

let friendSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Friend', friendSchema)
