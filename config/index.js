var env = process.env.NODE_ENV || 'global'
var cfg = require('./config.' + env)
module.exports = cfg;