var setup = require('./setup.js');
var codesnippets = require('./modules/codesnippets.js');
var languages = require('./modules/languages.js');
var user = require('./modules/user.js');
var tags = require('./modules/tags.js');
var tags = require('./modules/vote.js');

var app = setup.app;

const port = process.env.PORT || 3000
app.listen(port);
console.log('App is listening on %d port', port);