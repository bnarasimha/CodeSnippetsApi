
// Setup
var express = require('express');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const Schema = mongoose.Schema;

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

const VotesSchema = Schema({ 
    codeSnippetId : { type: Schema.Types.ObjectId },
    votes : String
});
var Vote = mongoose.model('Vote', VotesSchema);

const CodeSnippetSchema = Schema ({
    codesnippet : String,
    language : String,
    title : String,
    urlreference: String,
    userId : String,
    tags: String,
    createdDate: Date
});
var CodeSnippet = mongoose.model('CodeSnippet', CodeSnippetSchema);

const CommentSchema = Schema ({
    codeSnippetId: { type: Schema.Types.ObjectId },
    comment: String,
    userId: String
});
var Comment = mongoose.model("Comment", CommentSchema);

var Language = mongoose.model('Language', {
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
exports.Vote = Vote;
exports.Comment = Comment;