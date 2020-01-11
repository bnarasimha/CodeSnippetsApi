var setup = require('../setup.js');

var app = setup.app;
var CodeSnippet = setup.CodeSnippet;

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

//Filter code snippets based on tags
app.get('/api/CodeSnippets/tags/:tags', function(req, res){
    var tag = req.params.tags;
    CodeSnippet.find({ 'tags' : new RegExp(tag, 'i') }, function(err, codeSnippets){
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
            userId: req.body.userId,
            tags: req.body.tags
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
                                urlreference : req.body.urlreference,
                                tags : req.body.tags
                            };

    var query = { _id: req.body._id}
    CodeSnippet.findByIdAndUpdate(query, { $set : newCodeSnippet }, { new : true } , function(err, codeSnippets){
        if(err)  return handleError(err);
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




