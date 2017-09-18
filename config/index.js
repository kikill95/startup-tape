module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  ip: process.env.IP || '127.0.0.1',
  port: process.env.PORT || '3001',
  mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost/main'
}
