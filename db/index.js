const mongoose = require('mongoose')

const config = require('../config')

mongoose.Promise = global.Promise

mongoose.connect(config.mongoUrl, {useMongoClient: true}, err => {
  if (err) {
    throw err
  }
})

process.on('SIGINT', () => {
  mongoose.disconnect()
    .then(() => {
      console.log('Disconnected')
      process.exit()
    })
})

module.exports = mongoose
