// Setup

var express = require('express');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://bnarasimha21:1nvin$ible@cluster0-shard-00-00-shwiy.mongodb.net:27017/CodeSnippets?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

// Configuration
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vhd.api+json'}));
app.use(methodOverride());

// Model
var CodeSnippet = mongoose.model('CodeSnippet', {
    codesnippet : String,
    language : String,
    title : String
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

app.get('/api/languages', function(req, res){
    var languages = [{'languageId':'1', 'languageName':'All'},
                            {'languageId':'2', 'languageName':'C#'},
                            {'languageId':'3', 'languageName':'Java'},
                            {'languageId':'4', 'languageName':'Python'}];
    res.json(languages);
});

// Search Code Snippets
app.get('/api/searchCodeSnippets/:searchText', function(req, res){
    var searchText = req.params.searchText;
    CodeSnippet.find({'title': new RegExp(searchText, 'i')}, function(err, codeSnippets){
        if(err){
            res.send(err);
        }
        res.json(codeSnippets);
    });
});

//Filter code snippets based on language
app.get('/api/CodeSnippets/language/:language', function(req, res){
    CodeSnippet.find({language:req.params.language}, function(err, codeSnippets){
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
            codesnippet: req.body.codesnippet
        });    
    CodeSnippet.create(newCodeSnippet, function(err, codeSnippets){
        if(err) return handleError(err);
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
app.listen('8082');
console.log('App is listening on 8082 port');