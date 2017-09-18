const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const config = require('./config')
const users = require('./users/routes')

require('./db')

app.listen(config.port, config.ip, () => {
  console.log(`Server running at: ${config.ip}:${config.port}`)
})

app.use(bodyParser.json())

app.use('/api/v1', users)

//
// Error handlers
//

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found ${req.path}`)
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  if (error.errors) {
    return res.status(400).json({
      error: {
        name: error.name,
        errors: error.errors
      }
    })
  }
  next(error)
})

// development error handler
// will print stacktrace
if (config.nodeEnv === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
