// Setup

var express = require('express');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

const node_env = process.env.NODE_ENV || 'local';
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

// Model
var CodeSnippet = mongoose.model('CodeSnippet', {
    codesnippet : String,
    language : String,
    title : String,
    urlreference: String,
    userId : String
});

// Language Model
var Language = mongoose.model('language', {
    languageName : String,
    categoryType : String
});

var User = mongoose.model('User', {
    userId : String,
    isAdmin : Boolean
});

// Get User
app.get('/api/getUser/:userId', function(req, res){
    User.findOne({ 'userId' : req.params.userId}, function(err, user){
        if(err){
            console.log(err);
        }
        res.json(user);
    });
}); 

//Add User
app.post('/api/addUser', function(req, res){

    var user = new User({
        userId: req.body.userId,
        isAdmin: req.body.isAdmin
    });

    User.create(user, function(err, user){
        if(err) return handleError(err);
    });
});


// Get all languages
app.get('/api/languages', function(req, res){
    Language.find(function(err, languages){
        if(err){
            console.log(err);
        }
        res.json(languages);
    })
});

// Get All Code Snippets
app.get('/api/codeSnippets', function(req, res){
    CodeSnippet.find({}, function(err, codeSnippets){
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log(codeSnippets); 
        res.json(codeSnippets);
    });
});

// Get only My Code Snippets
app.get('/api/getMyCodeSnippets/:userId', function(req, res){
    var userId = req.params.userId;
    CodeSnippet.find({'userId': userId}, function(err, codeSnippets){
        if(err){
            res.send(err);
        }
        res.json(codeSnippets);
    });
});

// Search Code Snippets
app.get('/api/searchCodeSnippets/:userId/:searchText', function(req, res){
    var userId = req.params.userId;
    var searchText = req.params.searchText;

    CodeSnippet.find({'userId': userId, 'title': new RegExp(searchText, 'i')}, function(err, codeSnippets){
        if(err){
            res.send(err);
        }
        res.json(codeSnippets);
    });
});

//Filter code snippets based on language
app.get('/api/CodeSnippets/language/:userId/:language', function(req, res){
    var userId = req.params.userId;
    CodeSnippet.find({'userId': userId, language:req.params.language}, function(err, codeSnippets){
        if(err){
            console.log(err);
        }
        res.json(codeSnippets);
    });
});

// Get Code Snip Detail
app.get('/api/codeSnippets/:codeSnipId', function(req, res){
    CodeSnippet.findById(req.params.codeSnipId, function(err, codeSnippet){
        if(err){
            console.log(err);
        }
        res.json(codeSnippet);
    });
});

// Add Code Snippet
app.post('/api/addCodeSnippet', function(req, res){
    var newCodeSnippet = new CodeSnippet(
        {
            language:req.body.language,
            title: req.body.title,
            codesnippet: req.body.codesnippet,
            urlreference: req.body.urlreference,
            userId: req.body.userId
        });    

    CodeSnippet.create(newCodeSnippet, function(err, codeSnippets){
        if(err) return handleError(err);
    });
});

// Update Code Snippet
app.post('/api/editCodeSnippet', function(req, res){

    var newCodeSnippet =    {
                                language : req.body.language,
                                title : req.body.title,
                                codesnippet: req.body.codesnippet,
                                urlreference : req.body.urlreference
                            };

    var query = { _id: req.body._id}
    CodeSnippet.findByIdAndUpdate(query, { $set : newCodeSnippet }, { new : true } , function(err, codeSnippets){
        if(err)  return handleError(err);
    });
});

// Get Language Detail
app.get('/api/languageDetail/:languageId', function(req, res){
    Language.findById(req.params.languageId, function(err, language){
        if(err){
            console.log(err);
        }
        res.json(language);
    });
});

// Add Category
app.post('/api/addCategory', function(req, res){
    var newCategory = new Language(
        {
            languageName:req.body.languageName,
            categoryType:req.body.categoryType
        });
    Language.create(newCategory, function(err, codeSnippets){
        if(err) return handleError(err);
    });
});

// Updated Category
app.post('/api/updateCategory', function(req, res){
    var newCategory = 
        {
            languageName:req.body.languageName,
            categoryType:req.body.categoryType 
        };
    var query = { _id : req.body._id }
    Language.findByIdAndUpdate(query, { $set : newCategory }, {new :true }, function(err, category){
        if(err) {
            console.log(err);
            return handleError(err);
        }
    });
});

// Delete Code Snippet
app.delete('/api/deleteCategory/:languageId', function(req, res){
    Language.findById(req.params.languageId, function(err, Language){
        if(err){
            console.log(err);
        }
        if(Language)
            Language.remove();
    });
}); 

// Delete Code Snippet
app.delete('/api/deleteCodeSnippet/:codeSnipId', function(req, res){
    CodeSnippet.findById(req.params.codeSnipId, function(err, codeSnippet){
        if(err){
            console.log(err);
        }
        if(codeSnippet)
            codeSnippet.remove();
    });
}); 


 
//Run
//var port = cfg.port;
const port = process.env.PORT || 3000
app.listen(port);
console.log('App is listening on %d port', port);