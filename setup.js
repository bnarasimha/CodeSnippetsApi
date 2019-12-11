
// Setup
var express = require('express');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

const node_env = process.env.NODE_ENV || 'prod';
console.log('env: ' + node_env);
var cfg = require('./config/' + 'config.' + node_env)

mongoose.Promise = global.Promise;
mongoose.connect(cfg.MongoUri, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// Configuration
app.use(cors());
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vhd.api+json'}));
app.use(methodOverride());

var CodeSnippet = mongoose.model('CodeSnippet', {
    codesnippet : String,
    language : String,
    title : String,
    urlreference: String,
    userId : String,
    tags: String
});

var Language = mongoose.model('language', {
    languageName : String,
    categoryType : String
});

var User = mongoose.model('User', {
    userId : String,
    isAdmin : Boolean
});


exports.app = app;
exports.CodeSnippet = CodeSnippet;
exports.Language = Language;
exports.User = User;