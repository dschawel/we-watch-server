let mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/wewatch', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
console.log('connected to database')

module.exports.User = require('./user')