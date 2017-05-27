// Setup

var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://bnarasimha21:1nvin$ible@cluster0-shard-00-00-shwiy.mongodb.net:27017/CodeSnippets?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

// Configuration
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

app.get('/api/codeSnippets/:codeSnipId', function(req, res){
    console.log('inside get');
    CodeSnippet.findById(req.params.codeSnipId, function(err, codeSnippet){
        if(err){
            console.log(err);
        }
        console.log(codeSnippet); 
        res.json(codeSnippet);
    });
});

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

app.delete('/api/deleteCodeSnippet/:codeSnipId', function(req, res){
    CodeSnippet.findById(req.params.codeSnipId, function(err, codeSnippet){
        if(err){
            console.log(err);
        }
        codeSnippet.remove();
    });
}); 
 
//Run
app.listen('8082');
console.log('App is listening on 8082 port');