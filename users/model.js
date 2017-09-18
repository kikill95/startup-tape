const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
  surname: mongoose.Schema.Types.String,
  age: mongoose.Schema.Types.Number
})

module.exports = mongoose.model('User', userSchema)
