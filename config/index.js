var env = process.env.NODE_ENV || 'local'
console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)

var cfg = require('./config.' + env)
module.exports = cfg;