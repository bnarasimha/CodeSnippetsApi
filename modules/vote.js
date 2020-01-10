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