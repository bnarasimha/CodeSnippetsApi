var env = process.env.NODE_ENV || 'local'
console.log('env: ' + env)

var cfg = require('./config.' + env)
module.exports = cfg;