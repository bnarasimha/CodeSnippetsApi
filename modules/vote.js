var setup = require('../setup.js');

var app = setup.app;
var Vote = setup.Vote;

app.get('/api/getCodeSnippetVotes/:codeSnipId', function(req, res){
    Vote.findOne({codeSnippetId : req.params.codeSnipId})
    .exec(function(err, Vote){
        if(err){
            console.log(err);
        }
        res.json(Vote);
    });
});

app.post('/api/addCodeSnippetVote', function(req, res){
    var newCodeSnippetVote = new Vote({
        codeSnippetId : req.body.codeSnippetId,
        votes : req.body.votes
    });

    Vote.create(newCodeSnippetVote, function(err, addedVote){
        if(err) console.log(err);
    });
});

app.post('/api/updateCodeSnippetVote', function(req, res){
    
    Vote.findOne({ codeSnippetId : req.body.codeSnippetId }, function(err, resultVote){
        resultVote.votes = req.body.votes;
        resultVote.save();

        if(err)  return handleError(err);
    });
})