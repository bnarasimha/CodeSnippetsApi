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
        votes : "1"
    });

    Vote.create(newCodeSnippetVote, function(err, addedVote){
        if(err) return handleError(err);
    });
});

app.post('/api/updateCodeSnippetVote', function(req, res){

    var updateCodeSnippetVote = {
        votes : req.body.votes
    };
    
    Vote.findOne({ _id: req.body._id }, function(err, resultVote){
        resultVote.votes = updateCodeSnippetVote.votes;
        resultVote.save();

        if(err)  return handleError(err);
    });
})